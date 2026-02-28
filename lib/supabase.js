import { createBrowserClient } from '@supabase/ssr'

export const createClient = () => {
  return createBrowserClient(
    process.env.https://lqoedzuozraqgaaappvs.supabase.co,
    process.env.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxxb2VkenVvenJhcWdhYWFwcHZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIyODA5ODEsImV4cCI6MjA4Nzg1Njk4MX0.8AJpt0ic2QLasn3WI-vuqyi04K77VwnujJGq3MtPh0A
  )
}
