"use server";
import { cookies } from "next/headers";

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export const getPriorities = async () => {
  const supabase = createRouteHandlerClient({ cookies });
  const { data: priorities, error } = await supabase
    .from("priorities")
    .select("*");

  return { data: priorities, error };
};
