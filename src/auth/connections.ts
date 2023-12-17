import supabase from "@/lib/supabaseClient";
import { toast } from "sonner";

export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {},
  });

  if (error) {
    toast.error(error.message);
  }
};

export const signInWithGithub = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {},
  });

  if (error) {
    toast.error(error.message);
  }
};
