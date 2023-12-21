"use client";
import React from "react";
import { Button } from "../ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { IconContext } from "react-icons";
import { BsPlusCircleDotted } from "react-icons/bs";
import WorkflowActions from "./workflowActions";
import Task from "./task";
import { Dialog, DialogTrigger } from "../ui/dialog";
import NewTaskModal from "./newTaskModal";

type Props = {
  workflow: any;
};

const Workflow = (props: Props) => {
  const { workflow } = props;
  const [showNewTaskModal, setShowNewTaskModal] = React.useState(false);

  return (
    <Dialog open={showNewTaskModal} onOpenChange={setShowNewTaskModal}>
      <div className="flex flex-col border-gray-200 overflow-hidden h-fit pb-2 bg-white/60 rounded-md ring-1 ring-gray-200 min-w-72 w-72 relative shadow-md">
        <div className="flex items-center px-2 sticky top-0 left-0 right-0 z-10 mb-4 h-12 border-b backdrop-blur-sm">
          <div className="flex-1 h-full flex gap-2 items-center sticky top-24">
            <h3 className="text-sm truncate font-semibold">{workflow.name}</h3>
            <span className="text-muted-foreground">
              {workflow.tasks.length}
            </span>
          </div>
          <div className="">
            <DialogTrigger asChild>
              <Button className="" size="icon" variant="ghost">
                <IconContext.Provider value={{ className: "text-xl" }}>
                  <BsPlusCircleDotted />
                </IconContext.Provider>
              </Button>
            </DialogTrigger>
            <WorkflowActions />
          </div>
        </div>
        <ul className="flex flex-col px-3 gap-3 mb-4">
          {workflow.tasks.map((task: any) => (
            <li key={task.title}>
              <Task task={task} />
            </li>
          ))}
        </ul>
        <div className="px-2">
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full border-dashed">
              <IconContext.Provider value={{ className: "text-xl" }}>
                <PlusIcon />
              </IconContext.Provider>
              Add task
            </Button>
          </DialogTrigger>
        </div>
      </div>
      <NewTaskModal onClose={() => setShowNewTaskModal(false)} />
    </Dialog>
  );
};

export default Workflow;
