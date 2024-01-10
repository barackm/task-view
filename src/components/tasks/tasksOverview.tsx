"use client";
import { getTasksOverview } from "@/actions/ai";
import { useTasks } from "@/contexts/tasksContext";
import { useApi } from "@/hooks/useApi";
import React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { Button } from "../ui/button";
import { CaretSortIcon } from "@radix-ui/react-icons";

const TasksOverview = () => {
  const { selectedProject, tasks } = useTasks();
  const [isOpen, setIsOpen] = React.useState(false);
  const taskNames = Object.values(tasks)
    .flat()
    .map((task) => task.name) as string[];

  const { data, loading } = useApi({
    url: "/tasks-overview",
    fetcher: () =>
      getTasksOverview({
        projectDescription: selectedProject?.description,
        taskNames,
      }),
    condition: !!selectedProject?.description && !!taskNames.length,
  });

  const { overview, tips } = data || {};

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full space-y-2"
    >
      <div className="flex items-center justify-between space-x-4 px-4 py-2">
        <h4 className="text-sm font-semibold">
          Work Overview
          {loading && (
            <span className="text-xs text-gray-400"> (loading...)</span>
          )}
        </h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm">
            <CaretSortIcon className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="space-y-2">
        <div className="m-4 rounded-sm bg-white/60 p-4 shadow-md">
          <p className="text-sm font-normal mb-2">{overview}</p>
          <div className="flex flex-col gap-2">
            {Object.keys(tips || {}).map((tip) => (
              <div className="flex items-start gap-2" key={tip}>
                <div className="w-2 h-2 rounded-full bg-primary mt-1"></div>
                <p className="text-xs capitalize">
                  <strong>{tip}:</strong>
                  {/* @ts-ignore */}
                  <span>{tips?.[tip]}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default TasksOverview;
