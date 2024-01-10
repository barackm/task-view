"use client";
import { getWorkflows } from "@/actions/workflows";
import { useApi } from "@/hooks/useApi";
import { Workflow as WorkflowType } from "@/lib/types/workflow";
import { PostgrestError } from "@supabase/supabase-js";
import React from "react";
import Workflow from "./workflow";
import { useTasks } from "@/contexts/tasksContext";
import Link from "next/link";

const WorkflowsWrapper = () => {
  const { data } = useApi<{
    data: WorkflowType[] | null;
    error: PostgrestError | null;
  }>({
    url: "workflows",
    fetcher: getWorkflows,
  });

  const { data: workflows = [] } = data || {};
  const { projects, loadingProjects } = useTasks();

  const projectsAvalable = projects?.length > 0 && !loadingProjects;

  return (
    <div className="p-4 flex w-full gap-4 overflow-x-auto">
      {!projectsAvalable && (
        <div className="w-full flex justify-center items-center my-16">
          <Link href="/dashboard/projects/new" className="text-xl text-primary">
            Create a project to get started
          </Link>
        </div>
      )}
      {projectsAvalable &&
        workflows?.map((workflow) => (
          <Workflow key={workflow.id} workflow={workflow} />
        ))}
    </div>
  );
};

export default WorkflowsWrapper;
