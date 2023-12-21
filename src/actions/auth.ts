"use server";

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const exchangeCodeForSession = async (code: string) => {
  const supabase = createRouteHandlerClient({ cookies });
  await supabase.auth.exchangeCodeForSession(code);
};
