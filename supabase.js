const SUPABASE_URL = "https://mzfyfpnbuljajeuevgpx.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_SqF4W2p36ttIA4fkppq_HQ_1jWZN8XO";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);