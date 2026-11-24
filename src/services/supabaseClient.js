import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// `supabase` is null until credentials are provided. All services check this and
// fall back to demo mode, so the site never crashes without a backend.
export const supabase = url && anonKey ? createClient(url, anonKey) : null;
export const isBackendConnected = Boolean(supabase);
