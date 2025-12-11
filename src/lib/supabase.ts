import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error("Missing Supabase environment variables")
}

// Server-side Supabase client with service role key
// This bypasses RLS and should only be used in server-side code
export const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

// Database types
export interface Lead {
  id: string
  business_name: string
  industry: string
  phone: string
  email: string
  message: string
  created_at: string
}
