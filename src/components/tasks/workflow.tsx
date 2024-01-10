"use client";
import React from "react";
import { Button } from "../ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { IconContext } from "react-icons";
import { BsPlusCircleDotted } from "react-icons/bs";
import WorkflowActions from "./workflowActions";
import Task from "./task";
import NewTaskModal from "./newTaskModal";
import { Workflow } from "@/lib/types/workflow";
import { Sheet, SheetTrigger } from "../ui/sheet";
import { useTasks } from "@/contexts/tasksContext";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";

type Props = {
  workflow: Workflow;
};

const Workflow = (props: Props) => {
  const { workflow } = props;
  const { tasks } = useTasks();
  const [showNewTaskModal, setShowNewTaskModal] = React.useState(false);
  const { setNodeRef } = useDroppable({ id: workflow.id });
  const currentTasks = tasks[workflow.id] || [];

  return (
    <SortableContext
      id={workflow.id}
      items={(currentTasks || []) as any}
      strategy={rectSortingStrategy}
    >
      <Sheet
        open={showNewTaskModal}
        onOpenChange={(state) => setShowNewTaskModal(state)}
      >
        <div
          className="flex flex-col border-gray-200 h-fit pb-2 bg-white/60 rounded-md ring-1 ring-gray-200 shadow-md w-full"
          ref={setNodeRef}
        >
          <div className="flex items-center px-2 sticky top-0 left-0 right-0 z-10 mb-4 h-12 border-b backdrop-blur-sm">
            <div className="flex-1 h-full flex gap-2 items-center sticky top-24">
              <h3 className="text-sm truncate font-semibold">
                {workflow.name}
              </h3>
              <span className="text-muted-foreground">
                {currentTasks.length}
              </span>
            </div>
            <div className="">
              <SheetTrigger asChild>
                <Button className="" size="icon" variant="ghost">
                  <IconContext.Provider value={{ className: "text-xl" }}>
                    <BsPlusCircleDotted />
                  </IconContext.Provider>
                </Button>
              </SheetTrigger>
              <WorkflowActions />
            </div>
          </div>
          <ul className="flex flex-col px-3 gap-3 mb-4">
            {currentTasks.map((task) => (
              <li key={task.id}>
                <Task task={task} />
              </li>
            ))}
          </ul>
          <div className="px-2">
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full border-dashed">
                <IconContext.Provider value={{ className: "text-xl" }}>
                  <PlusIcon />
                </IconContext.Provider>
                Add task
              </Button>
            </SheetTrigger>
            <NewTaskModal
              onClose={() => setShowNewTaskModal(false)}
              workflow={workflow}
            />
          </div>
        </div>
      </Sheet>
    </SortableContext>
  );
};

export default Workflow;
