import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = 'https://lqoedzuozraggaaappvs.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ile_Y7euHAxebqkvQE__mn1hgg_YhUbfE1F'

export const createClient = () => {
  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}
