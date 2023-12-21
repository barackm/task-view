import React from "react";
import Workflow from "./workflow";
import workflows from "@/store/tasks.json";

const WorkflowsWrapper = () => {
  return (
    <div className="p-4 flex w-full gap-4 relative overflow-x-auto">
      {workflows.map((workflow) => (
        <Workflow key={workflow.name} workflow={workflow} />
      ))}
    </div>
  );
};

export default WorkflowsWrapper;
