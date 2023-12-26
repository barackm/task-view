"use client";
import { createProject, getProject } from "@/actions/projects";
import { useTeams } from "@/contexts/teamsContext";
import { useApi } from "@/hooks/useApi";
import { errorHandler } from "@/lib/errorHandler";
import { projectSchema } from "@/lib/schemas/project";
import { Project } from "@/lib/types/project";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDays } from "date-fns";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

type ProjectFormContextProps = {
  form: ReturnType<typeof useForm>;
  onSubmit: (data: z.infer<typeof projectSchema>) => void;
  submitting: boolean;
  fetchingProject: boolean;
  project: Project | null;
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
  const params: { id: string } = useParams();
  const { id: projectId } = params;
  const {
    data: projectData,
    error,
    loading: fetchingProject,
  } = useApi({
    url: `/projects/${projectId}`,
    condition: projectId !== "new",
    fetcher: () => getProject(projectId),
  });
  const { data: project } = projectData || {};

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

  const { handleSubmit, setValue } = form;
  const [submitting, setSubmitting] = React.useState(false);

  const onSubmit = async (data: z.infer<typeof projectSchema>) => {
    try {
      setSubmitting(true);
      const res = await createProject(data, selectedTeam?.id!);
      const { data: resData, error } = res;
      if (error) {
        throw error;
      }
      const { id } = resData;
      router.push(`/dashboard/projects/${id}`);
      toast.success("Project created successfully");
      form.reset();
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
    fetchingProject,
    project,
  };

  useEffect(() => {
    if (fetchingProject) return;

    if ((projectId !== "new" && !project) || (projectId !== "new" && error)) {
      toast.error("Project not found");
      router.push("/dashboard/projects");
      return;
    }

    if (project) {
      const { name, description, dates } = project;
      setValue("name", name);
      setValue("description", description);
      setValue("dates", dates);
    }
  }, [
    project,
    projectId,
    error,
    router,
    setValue,
    fetchingProject,
    projectData,
  ]);

  return (
    <ProjectFormContext.Provider value={value}>
      <form onSubmit={handleSubmit(onSubmit as any)}>{props.children}</form>
    </ProjectFormContext.Provider>
  );
};

export default ProjectForm;
