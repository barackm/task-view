"use server";
import { cookies } from "next/headers";
import * as z from "zod";

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { taskSchema } from "@/lib/schemas/task";

type ProjectMetaData = {
  team_id: string;
  project_id: string;
  workflow_id: string;
  priority_id?: string;
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

export const getTasks = async (project_id: string) => {
  const supabase = createRouteHandlerClient({ cookies });
  const { data: tasks, error } = await supabase
    .from("tasks")
    .select(
      "*, user:profiles (*), priority:priorities (*), workflow:workflows (*)"
    )
    .eq("project_id", project_id);

  return { data: tasks, error };
};

export const createMassTasks = async (args: {
  tasks: z.infer<typeof taskSchema>[];
  projectMataData: ProjectMetaData;
}) => {
  const { tasks, projectMataData } = args;
  const supabase = createRouteHandlerClient({ cookies });

  const { data, error } = await supabase
    .from("tasks")
    .insert(tasks.map((task) => ({ ...task, ...projectMataData })))
    .select("*");

  return { data, error };
};
