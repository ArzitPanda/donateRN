
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rnoczrovwjscbrvtcjoj.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJub2N6cm92d2pzY2JydnRjam9qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU5NjU3MTgsImV4cCI6MjAzMTU0MTcxOH0.GuD6tDSYkErcCUQu_XaVY50ucyatt-wv4X1ygNjqWiw"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase