-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table for user data
CREATE TABLE public.profiles (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  email text,
  avatar_url text,
  credits integer NOT NULL DEFAULT 25,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view own profile" 
ON public.profiles FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile" 
ON public.profiles FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create inventory table
CREATE TABLE public.inventory (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  item_name text NOT NULL,
  quantity numeric NOT NULL DEFAULT 0,
  unit text DEFAULT 'pieces',
  category text,
  expiry_date date,
  added_date date DEFAULT CURRENT_DATE,
  notes text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on inventory
ALTER TABLE public.inventory ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for inventory
CREATE POLICY "Users can manage own inventory" 
ON public.inventory FOR ALL 
USING (auth.uid() = user_id);

-- Create shopping lists table
CREATE TABLE public.shopping_lists (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  list_name text NOT NULL DEFAULT 'My Shopping List',
  status text DEFAULT 'active' CHECK (status IN ('active', 'completed', 'archived')),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on shopping lists
ALTER TABLE public.shopping_lists ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for shopping lists
CREATE POLICY "Users can manage own shopping lists" 
ON public.shopping_lists FOR ALL 
USING (auth.uid() = user_id);

-- Create shopping list items table
CREATE TABLE public.shopping_list_items (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  shopping_list_id uuid NOT NULL REFERENCES public.shopping_lists(id) ON DELETE CASCADE,
  item_name text NOT NULL,
  quantity numeric NOT NULL DEFAULT 1,
  unit text DEFAULT 'pieces',
  is_purchased boolean DEFAULT false,
  estimated_price numeric,
  actual_price numeric,
  platform text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on shopping list items
ALTER TABLE public.shopping_list_items ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for shopping list items
CREATE POLICY "Users can manage own shopping list items" 
ON public.shopping_list_items FOR ALL 
USING (shopping_list_id IN (
  SELECT id FROM public.shopping_lists WHERE user_id = auth.uid()
));

-- Create price data table (public read access for price comparison)
CREATE TABLE public.price_data (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  item_name text NOT NULL,
  platform text NOT NULL,
  price numeric NOT NULL,
  unit text NOT NULL,
  quantity numeric NOT NULL DEFAULT 1,
  price_per_unit numeric NOT NULL,
  availability boolean DEFAULT true,
  scraped_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on price data
ALTER TABLE public.price_data ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access to price data
CREATE POLICY "Price data is publicly readable" 
ON public.price_data FOR SELECT 
USING (true);

-- Create voice commands table
CREATE TABLE public.voice_commands (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  audio_file_url text,
  transcription text,
  parsed_intent jsonb,
  credits_used integer DEFAULT 2,
  processing_status text DEFAULT 'pending' CHECK (processing_status IN ('pending', 'processing', 'completed', 'failed')),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on voice commands
ALTER TABLE public.voice_commands ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for voice commands
CREATE POLICY "Users can manage own voice commands" 
ON public.voice_commands FOR ALL 
USING (auth.uid() = user_id);

-- Create payments table
CREATE TABLE public.payments (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  razorpay_order_id text NOT NULL,
  razorpay_payment_id text,
  amount integer NOT NULL, -- Amount in paise
  credits_purchased integer NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on payments
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for payments
CREATE POLICY "Users can manage own payments" 
ON public.payments FOR ALL 
USING (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at timestamps
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_inventory_updated_at
  BEFORE UPDATE ON public.inventory
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_shopping_lists_updated_at
  BEFORE UPDATE ON public.shopping_lists
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_shopping_list_items_updated_at
  BEFORE UPDATE ON public.shopping_list_items
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_voice_commands_updated_at
  BEFORE UPDATE ON public.voice_commands
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_payments_updated_at
  BEFORE UPDATE ON public.payments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Function to handle new user registration and create profile
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS trigger 
LANGUAGE plpgsql 
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, email, credits)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'),
    NEW.email,
    25 -- Default 25 credits for new users
  );
  RETURN NEW;
END;
$$;

-- Trigger to create profile on user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();