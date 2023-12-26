"use server";
import { cookies } from "next/headers";
import * as z from "zod";

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { taskSchema } from "@/lib/schemas/task";

type ProjectMetaData = {
  team_id: string;
  project_id: string;
  workflow_id: string;
};

export const createTask = async (args: {
  task: z.infer<typeof taskSchema>;
  projectMataData: ProjectMetaData;
}) => {
  const { task, projectMataData } = args;
  const supabase = createRouteHandlerClient({ cookies });

  const { data, error } = await supabase
    .from("tasks")
    .insert({ ...task, ...projectMataData })
    .select("*");

  return { data, error };
};
