import { createClient as clientSupabaseCreate } from "./client";

import { createClient as serverSupabaseCreate } from "./client";

const supabaseClient = clientSupabaseCreate();
const supabaseServer = serverSupabaseCreate();

export { supabaseClient, supabaseServer };
