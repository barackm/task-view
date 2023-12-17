import React from "react";
import Tabs from "@/components/tabs";
import WorkflowsWrapper from "@/components/tasks/woRkflowsWrapper";

const Tasks = () => {
  return (
    <div className="w-full">
      <Tabs />
      <div className="p-4">
        <WorkflowsWrapper />
      </div>
    </div>
  );
};

export default Tasks;
