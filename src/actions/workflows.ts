"use server";

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const getWorkflows = async () => {
  const supabase = createRouteHandlerClient({ cookies });
  const { data: workflows, error } = await supabase
    .from("workflows")
    .select("*");

  return { data: workflows, error };
};
