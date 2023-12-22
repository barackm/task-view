import React from "react";
import Tabs from "@/components/tabs";
import WorkflowsWrapper from "@/components/tasks/workflowsWrapper";

const Tasks = () => {
  return (
    <div className="w-full">
      <Tabs />
      <WorkflowsWrapper />
    </div>
  );
};

export default Tasks;
