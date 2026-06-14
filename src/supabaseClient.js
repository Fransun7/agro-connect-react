import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ixtvezgqzybbkbfvfiof.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4dHZlemdxenliYmtiZnZmaW9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEwODY0NTMsImV4cCI6MjA5NjY2MjQ1M30.dXUU4vLCowFv40GByh6QKomyv0Y-h8Rjyb6rKqdK6GA ";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
