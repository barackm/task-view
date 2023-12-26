"use client";
import { useApi } from "@/hooks/useApi";
import { Project } from "@/lib/types/project";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useTeams } from "./teamsContext";
import { getProjects } from "@/actions/projects";
import { useSearch } from "@/hooks/useSearch";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";

type TaskContextProps = {
  projects: Project[];
  selectedProject: Project | null;
};

const TaskContext = createContext<TaskContextProps | null>(null);

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};

type Props = {
  children: React.ReactNode;
};

export const TaskProvider = ({ children }: Props) => {
  const { selectedTeam, loadingTeams } = useTeams();
  const { updateSearch } = useSearch();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const searchParams = useSearchParams();
  const projectId = searchParams.get("project");

  const { data, loading } = useApi<{ data: Project[] | null }>({
    url: "/projects",
    condition: !selectedTeam || loadingTeams ? false : true,
    fetcher: () => getProjects(selectedTeam?.id!),
  });

  const projects = useMemo(() => data?.data || [], [data]);

  useEffect(() => {
    if (loading || !selectedTeam) return;

    if (projects.length === 0) {
      toast.info("You don't have any projects yet. Create one to get started.");
      return;
    }

    if (projectId) {
      const selectedProject = projects.find((p) => p.id === projectId);
      if (selectedProject) {
        setSelectedProject(selectedProject);
      } else {
        setSelectedProject(projects[0]);
        updateSearch({ project: projects[0].id });
      }
    } else {
      setSelectedProject(projects[0]);
      updateSearch({ project: projects[0].id });
    }
  }, [projects, loading, projectId, updateSearch, selectedTeam]);

  const value = {
    projects,
    selectedProject,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
