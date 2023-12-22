"use server";

import { teamSchema } from "@/lib/schemas/team";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import * as z from "zod";

export const getUserTeams = async () => {
  const supabase = createRouteHandlerClient({ cookies });
  const data = await supabase.from("teams").select();
  return data;
};

export const createTeam = async (
  team: z.infer<typeof teamSchema>,
  user_id: string
) => {
  const supabase = createRouteHandlerClient({ cookies });
  const { data, error } = await supabase.from("teams").insert({
    name: team.name,
    description: team.description,
    user_id,
  });
  return { data, error };
};
