import { createClient } from '@supabase/supabase-js';

// Configuration from MCP tools
const supabaseUrl = 'https://qfsesquowvfxccqwjmth.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFmc2VzcXVvd3ZmeGNjcXdqbXRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg0MDI3NzIsImV4cCI6MjA5Mzk3ODc3Mn0.IMt6yo71dCZtYGJLI2OSAKLi7ZRBxYwNjh08DywNTZY';

export const supabase = createClient(supabaseUrl, supabaseKey);
