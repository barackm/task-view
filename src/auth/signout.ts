import supabase from "@/lib/supabaseClient";

export const signOut = async () => {
  await supabase.auth.signOut();
};
