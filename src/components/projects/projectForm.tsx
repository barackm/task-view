"use client";
import { createProject } from "@/actions/projects";
import { useTeams } from "@/contexts/teamsContext";
import { errorHandler } from "@/lib/errorHandler";
import { projectSchema } from "@/lib/schemas/project";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDays } from "date-fns";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

type ProjectFormContextProps = {
  form: ReturnType<typeof useForm>;
  onSubmit: (data: z.infer<typeof projectSchema>) => void;
  submitting: boolean;
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
  const router = useRouter();
  const { selectedTeam } = useTeams();
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
  const [submitting, setSubmitting] = React.useState(false);

  const onSubmit = async (data: z.infer<typeof projectSchema>) => {
    try {
      setSubmitting(true);
      const res = await createProject(data, selectedTeam?.id!);
      const { data: resData, error } = res;
      if (error) {
        throw error;
      }
      console.log(resData, "resData");
      toast.success("Project created successfully");
    } catch (error) {
      errorHandler(error);
    } finally {
      setSubmitting(false);
    }
  };

  const value = {
    form: form as any,
    onSubmit,
    submitting,
  };

  return (
    <ProjectFormContext.Provider value={value}>
      <form onSubmit={handleSubmit(onSubmit as any)}>{props.children}</form>
    </ProjectFormContext.Provider>
  );
};

export default ProjectForm;
