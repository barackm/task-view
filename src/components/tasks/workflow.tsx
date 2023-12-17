"use client";
import React from "react";
import { Button } from "../ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { IconContext } from "react-icons";
import { BsPlusCircleDotted } from "react-icons/bs";
import WorkflowActions from "./workflowActions";

const Workflow = () => {
  return (
    <div className="flex flex-col flex-grow border-r border-gray-200 overflow-hidden relative pb-2 bg-white/60 rounded-md ring-1 ring-gray-200 w-72">
      <div className="flex items-center px-2 sticky top-0 left-0 right-0 z-10 bg-white/60 mb-4 py-2 border-b">
        <div className="flex-1 flex gap-2 items-center">
          <h3 className="text-sm truncate font-semibold">To Do</h3>
          <span className="text-muted-foreground">6</span>
        </div>
        <div className="">
          <Button className="" size="icon" variant="ghost">
            <IconContext.Provider value={{ className: "text-xl" }}>
              <BsPlusCircleDotted />
            </IconContext.Provider>
          </Button>
          <WorkflowActions />
        </div>
      </div>
      <ul></ul>
      <div className="px-2">
        <Button variant="outline" className="w-full border-dashed">
          <IconContext.Provider value={{ className: "text-xl" }}>
            <PlusIcon />
          </IconContext.Provider>
          Add task
        </Button>
      </div>
    </div>
  );
};

export default Workflow;
