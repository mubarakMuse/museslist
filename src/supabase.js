import { createClient } from '@supabase/supabase-js';

// Replace 'YOUR_SUPABASE_URL' and 'YOUR_SUPABASE_API_KEY' with your actual Supabase project URL and API key
const supabaseUrl = 'https://wakzuklfbtvgsmkjawuv.supabase.co';
const supabaseApiKey = process.env.REACT_APP_SUPERBASE_KEY;

// Initialize the Supabase client
const supabase = createClient(supabaseUrl, supabaseApiKey);

export { supabase };
