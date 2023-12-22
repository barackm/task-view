"use server";

import supabase from "@/lib/supabaseClient";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const getUserTeams = async () => {
  const data = await supabase.from("teams").select();
  return data;
};
