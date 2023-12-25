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

const ProjectDetails = () => {
  return (
    <div className="w-4/6">
      <div className="">
        <Input
          className="text-4xl tracking-tighter py-2 px-0 border-none shadow-none font-semibold outline-none"
          value="😎This is the project name"
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
        <TextEditor />
      </div>
    </div>
  );
};

export default ProjectDetails;
