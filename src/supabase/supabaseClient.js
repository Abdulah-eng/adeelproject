import { createClient } from '@supabase/supabase-js';
import conf from '../conf/conf';

const supabaseUrl = conf.supabaseUrl;
const supabaseAnonKey = conf.supabaseAnon;


export const supabase = createClient(supabaseUrl, supabaseAnonKey);
