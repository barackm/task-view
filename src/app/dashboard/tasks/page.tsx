import React from "react";
import Tabs from "@/components/tabs";
import WorkflowsWrapper from "@/components/tasks/workflowsWrapper";

const Tasks = () => {
  return (
    <div className="w-full">
      <Tabs />
      <div className="">
        <WorkflowsWrapper />
      </div>
    </div>
  );
};

export default Tasks;
