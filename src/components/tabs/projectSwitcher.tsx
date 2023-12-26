"use client";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { ChevronDownIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../ui/command";
import Link from "next/link";
import { Route } from "@/lib/routes";
import { useSearch } from "@/hooks/useSearch";
import { useTasks } from "@/contexts/tasksContext";

const ProjectSwitcher = () => {
  const { updateSearch } = useSearch();
  const { projects, selectedProject } = useTasks();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="ml-auto">
          {selectedProject?.name || "Select project"}
          <ChevronDownIcon className="ml-2 h-4 w-4 text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" align="end">
        <Command>
          <CommandInput placeholder="Select project..." />
          <CommandList>
            <CommandEmpty>No projects found.</CommandEmpty>
            <CommandGroup>
              {projects.map((project) => (
                <CommandItem
                  key={project.id}
                  onSelect={() => {
                    updateSearch({ project: project.id! });
                  }}
                  className="teamaspace-y-1 flex flex-col items-start px-4 py-2"
                >
                  <p>{project.name}</p>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <Link href={Route.newProject}>
                <CommandItem>
                  <PlusCircledIcon className="mr-2 h-5 w-5" />
                  Create a new project
                </CommandItem>
              </Link>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default ProjectSwitcher;
