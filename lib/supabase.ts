import { createClient } from '@supabase/supabase-js';

// 設定預設備用網址，確保 Build 階段不會崩潰
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://nxjtcrcdjbcyjbdogyw.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
