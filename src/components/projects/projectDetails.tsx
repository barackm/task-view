"use client";
import React from "react";
import { Input } from "../ui/input";
import TextEditor from "../shared/textEditor";
import { Button } from "../ui/button";
import { FaWandMagicSparkles } from "react-icons/fa6";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { IconContext } from "react-icons";
import { useParams } from "next/navigation";
import { useProjectForm } from "./projectForm";

const ProjectDetails = () => {
  const { form } = useProjectForm();
  const { register, getValues, setValue } = form;
  const { id } = useParams<{ id: string }>();
  const isNew = id === "new";

  return (
    <div className="w-4/6">
      <div className="">
        <Input
          {...register("name")}
          className="text-4xl tracking-tighter py-2 px-0 border-none shadow-none font-semibold outline-none"
        />
      </div>
      <div className="flex items-center my-4">
        <h3 className="text-sm font-medium">Description</h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon" variant="secondary">
                <IconContext.Provider
                  value={{ className: "text-xl text-primary" }}
                >
                  <FaWandMagicSparkles />
                </IconContext.Provider>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Generate with AI</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div>
        <TextEditor
          onChange={(value) => setValue("description", value)}
          value={getValues("description")}
        />
      </div>
      {isNew && (
        <Button className="mt-4" size="sm" type="submit">
          Submit
        </Button>
      )}
    </div>
  );
};

export default ProjectDetails;
