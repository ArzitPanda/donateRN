

import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rnoczrovwjscbrvtcjoj.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJub2N6cm92d2pzY2JydnRjam9qIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxNTk2NTcxOCwiZXhwIjoyMDMxNTQxNzE4fQ.Q0SvEDbCYGti7gvcPx4b9LHrDQ_P8fvJnEvdydJ6PSk"
const supabase = createClient(supabaseUrl, supabaseKey,{
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false
    }
})
export default supabase;