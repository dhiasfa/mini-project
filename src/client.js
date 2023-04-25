
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kpbcywbosxqtlyyzflpu.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtwYmN5d2Jvc3hxdGx5eXpmbHB1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE4NzA5NTQsImV4cCI6MTk5NzQ0Njk1NH0.uFwto7UVlysV87eYIHA3rZHomDHk6K0p8tmC9pIeNzE'
export const supabase = createClient(supabaseUrl, supabaseKey)