import React from "react";
import Tabs from "@/components/tabs";
import WorkflowsWrapper from "@/components/tasks/workflowsWrapper";
import TasksOverview from "@/components/tasks/tasksOverview";

const Tasks = () => {
  return (
    <div className="w-full">
      <Tabs />
      <TasksOverview />
      <WorkflowsWrapper />
    </div>
  );
};

export default Tasks;
