"use client";
import { getWorkflows } from "@/actions/workflows";
import { useApi } from "@/hooks/useApi";
import { Workflow as WorkflowType } from "@/lib/types/workflow";
import { PostgrestError } from "@supabase/supabase-js";
import React from "react";
import Workflow from "./workflow";
import { useTasks } from "@/contexts/tasksContext";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

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

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {};
  const handleDragOver = (event: any) => {};

  return (
    <div className="p-4 flex space-x-4 overflow-x-auto">
      {!projectsAvalable && (
        <div className="w-full flex justify-center items-center my-16">
          <Link href="/dashboard/projects/new" className="text-xl text-primary">
            Create a project to get started
          </Link>
        </div>
      )}
      <DndContext
        onDragEnd={handleDragEnd}
        collisionDetection={closestCenter}
        onDragOver={handleDragOver}
      >
        {projectsAvalable &&
          workflows?.map((workflow) => (
            <div key={workflow.id} className="flex-none w-72">
              <Workflow workflow={workflow} />
            </div>
          ))}
      </DndContext>
    </div>
  );
};

export default WorkflowsWrapper;
