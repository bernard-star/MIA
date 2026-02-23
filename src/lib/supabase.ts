import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ngrropwlxsoguckoeryi.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ncnJvcHdseHNvZ3Vja29lcnlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE4MDQ4NzEsImV4cCI6MjA4NzM4MDg3MX0.O8a8gnOe4H4EyK_uf78QTYB8LEEiErfVuIxZRIkm2pc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
