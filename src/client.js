import { createClient } from '@supabase/supabase-js';

const URL = "https://mywpcjtsrqfcircbfxzw.supabase.co";
const API_KEY = "sb_publishable_JeKrA9vBe5UsD-Wj8S2png_NTO7gwCh";

export const supabase = createClient(URL, API_KEY);