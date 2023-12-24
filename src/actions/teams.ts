"use server";

import { teamSchema } from "@/lib/schemas/team";
import { generateRandomHex } from "@/lib/utils";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import * as z from "zod";

export const getUserTeams = async () => {
  const supabase = createRouteHandlerClient({ cookies });
  const data = await supabase.from("teams").select();
  return data;
};

export const createTeam = async (team: z.infer<typeof teamSchema>) => {
  const supabase = createRouteHandlerClient({ cookies });
  let identifier;
  let unique = false;
  let attempts = 0;

  while (!unique && attempts < 10) {
    identifier = `${team.name
      .replace(/\s+/g, "-")
      .toLowerCase()}-${generateRandomHex(2)}`;
    const { data, error } = await supabase
      .from("teams")
      .select("identifier")
      .eq("identifier", identifier);
    if (error) {
      throw new Error("Error checking identifier uniqueness");
    }
    unique = data.length === 0;
    attempts++;
  }

  if (!unique) {
    throw new Error("Unable to generate a unique identifier for the team");
  }

  const { data, error } = await supabase.from("teams").insert({
    name: team.name,
    description: team.description,
    identifier,
  });
  return { data, error };
};
