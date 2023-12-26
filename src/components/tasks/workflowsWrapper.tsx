"use client";
import { getWorkflows } from "@/actions/workflows";
import { useApi } from "@/hooks/useApi";
import { Workflow as WorkflowType } from "@/lib/types/workflow";
import { PostgrestError } from "@supabase/supabase-js";
import React from "react";
import Workflow from "./workflow";

const WorkflowsWrapper = () => {
  const { data } = useApi<{
    data: WorkflowType[] | null;
    error: PostgrestError | null;
  }>({
    url: "workflows",
    fetcher: getWorkflows,
  });

  const { data: workflows = [] } = data || {};

  return (
    <div className="p-4 flex w-full gap-4 overflow-x-auto">
      {workflows?.map((workflow) => (
        <Workflow key={workflow.id} workflow={workflow} />
      ))}
    </div>
  );
};

export default WorkflowsWrapper;
