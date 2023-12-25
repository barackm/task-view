"use client";
import { projectSchema } from "@/lib/schemas/project";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDays } from "date-fns";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

type ProjectFormContextProps = {
  form: ReturnType<typeof useForm>;
  onSubmit: (data: z.infer<typeof projectSchema>) => void;
};

const ProjectFormContext = React.createContext<ProjectFormContextProps | null>(
  null
);

export const useProjectForm = () => {
  const context = React.useContext(ProjectFormContext);
  if (!context) {
    throw new Error(
      "useProjectForm must be used within a ProjectFormContextProvider"
    );
  }
  return context;
};

type Props = {
  children: React.ReactNode;
};

const ProjectForm = (props: Props) => {
  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "Project name",
      dates: {
        from: new Date(),
        to: addDays(new Date(), 7),
      },
    },
  });

  const { handleSubmit } = form;

  const onSubmit = (data: z.infer<typeof projectSchema>) => {
    console.log(data);
  };

  console.log(form.getValues());
  const value = {
    form: form as any,
    onSubmit,
  };

  return (
    <ProjectFormContext.Provider value={value}>
      <form onSubmit={handleSubmit(onSubmit as any)}>{props.children}</form>
    </ProjectFormContext.Provider>
  );
};

export default ProjectForm;
