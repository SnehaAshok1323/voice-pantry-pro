import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const openaiApiKey = Deno.env.get('OPENAI_API_KEY')!;

const supabase = createClient(supabaseUrl, supabaseKey);

interface VoiceCommand {
  audioUrl: string;
  fileName: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    // Verify the JWT and get user
    const jwt = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(jwt);
    
    if (authError || !user) {
      throw new Error('Invalid token');
    }

    console.log('Processing voice command for user:', user.id);

    const { audioUrl, fileName }: VoiceCommand = await req.json();

    if (!audioUrl) {
      throw new Error('Audio URL is required');
    }

    // Check user credits
    const { data: userRecord, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (userError || !userRecord) {
      console.error('Error fetching user:', userError);
      throw new Error('User not found');
    }

    // For now, assume users have enough credits (we'll implement credit management later)
    console.log('User found:', userRecord);

    // Download audio file
    const audioResponse = await fetch(audioUrl);
    if (!audioResponse.ok) {
      throw new Error('Failed to download audio file');
    }

    const audioBuffer = await audioResponse.arrayBuffer();

    // Transcribe audio using OpenAI Whisper
    console.log('Transcribing audio...');
    const formData = new FormData();
    formData.append('file', new Blob([audioBuffer], { type: 'audio/webm' }), fileName);
    formData.append('model', 'whisper-1');

    const transcriptionResponse = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
      },
      body: formData,
    });

    if (!transcriptionResponse.ok) {
      throw new Error('Failed to transcribe audio');
    }

    const transcriptionData = await transcriptionResponse.json();
    const transcription = transcriptionData.text;
    console.log('Transcription:', transcription);

    // Parse the transcription using GPT to extract intent
    console.log('Parsing intent...');
    const gptResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are a grocery management assistant. Parse the user's voice command and extract:
1. Action: ADD_ITEM, REMOVE_ITEM, UPDATE_STOCK, MARK_PURCHASED, CHECK_PRICE, or GENERAL_QUERY
2. Item name: the grocery item mentioned
3. Quantity: if mentioned (with unit)
4. Additional context: any other relevant details

Return a JSON object with: { "action": "ADD_ITEM", "item": "potatoes", "quantity": "2", "unit": "kg", "context": "" }`
          },
          {
            role: 'user',
            content: transcription
          }
        ],
        max_tokens: 150,
        temperature: 0.3,
      }),
    });

    if (!gptResponse.ok) {
      throw new Error('Failed to parse intent');
    }

    const gptData = await gptResponse.json();
    const parsedIntent = JSON.parse(gptData.choices[0].message.content);
    console.log('Parsed intent:', parsedIntent);

    // Store the voice command in database
    const { data: voiceCommandRecord, error: voiceCommandError } = await supabase
      .from('voice_commands')
      .insert({
        user_id: user.id,
        audio_file_url: audioUrl,
        transcription: transcription,
        parsed_intent: parsedIntent,
        credits_used: 2,
        processing_status: 'completed'
      })
      .select()
      .single();

    if (voiceCommandError) {
      console.error('Error storing voice command:', voiceCommandError);
      throw new Error('Failed to store voice command');
    }

    // Process the intent (add to inventory, shopping list, etc.)
    let actionResult = null;
    
    if (parsedIntent.action === 'ADD_ITEM') {
      // Check if item already exists in shopping list
      const { data: existingList } = await supabase
        .from('shopping_lists')
        .select('id')
        .eq('user_id', user.id)
        .eq('status', 'active')
        .single();

      let shoppingListId = existingList?.id;

      if (!shoppingListId) {
        // Create new shopping list
        const { data: newList, error: listError } = await supabase
          .from('shopping_lists')
          .insert({
            user_id: user.id,
            list_name: 'My Shopping List',
            status: 'active'
          })
          .select()
          .single();

        if (listError) {
          console.error('Error creating shopping list:', listError);
        } else {
          shoppingListId = newList.id;
        }
      }

      if (shoppingListId) {
        // Add item to shopping list
        const { error: itemError } = await supabase
          .from('shopping_list_items')
          .insert({
            shopping_list_id: shoppingListId,
            item_name: parsedIntent.item,
            quantity: parsedIntent.quantity ? parseFloat(parsedIntent.quantity) : 1,
            unit: parsedIntent.unit || 'pieces'
          });

        if (itemError) {
          console.error('Error adding item to shopping list:', itemError);
        } else {
          actionResult = `Added ${parsedIntent.quantity || '1'} ${parsedIntent.unit || 'pieces'} of ${parsedIntent.item} to your shopping list`;
        }
      }
    }

    console.log('Voice command processed successfully');

    return new Response(
      JSON.stringify({
        success: true,
        transcription: transcription,
        parsedIntent: parsedIntent,
        actionResult: actionResult || `Command processed: ${parsedIntent.action}`,
        creditsUsed: 2
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error in process-voice-command function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});