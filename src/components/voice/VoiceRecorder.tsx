import { useState } from 'react';
import { Mic, MicOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface VoiceRecorderProps {
  onTranscript?: (text: string) => void;
  className?: string;
}

export const VoiceRecorder = ({ onTranscript, className }: VoiceRecorderProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleToggleRecording = async () => {
    if (isRecording) {
      setIsRecording(false);
      setIsProcessing(true);
      
      // Simulate processing
      setTimeout(() => {
        setIsProcessing(false);
        onTranscript?.("Add 2kg potatoes to my shopping list");
      }, 2000);
    } else {
      setIsRecording(true);
    }
  };

  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      <Button
        size="lg"
        onClick={handleToggleRecording}
        disabled={isProcessing}
        className={cn(
          "w-20 h-20 rounded-full relative transition-all duration-300",
          isRecording 
            ? "bg-destructive hover:bg-destructive/90 voice-pulse" 
            : "bg-primary hover:bg-primary/90 glow-primary",
          isProcessing && "animate-pulse"
        )}
      >
        {isProcessing ? (
          <Loader2 className="w-8 h-8 animate-spin" />
        ) : isRecording ? (
          <MicOff className="w-8 h-8" />
        ) : (
          <Mic className="w-8 h-8" />
        )}
      </Button>
      
      <div className="text-center">
        <p className="text-sm font-medium text-foreground">
          {isProcessing 
            ? "Processing..." 
            : isRecording 
            ? "Listening..." 
            : "Tap to speak"
          }
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Say something like "Add milk to shopping list"
        </p>
      </div>
    </div>
  );
};