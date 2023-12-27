"use client";
import { useApi } from "@/hooks/useApi";
import { Project } from "@/lib/types/project";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useTeams } from "./teamsContext";
import { getProjects } from "@/actions/projects";
import { useSearch } from "@/hooks/useSearch";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import { Task } from "@/lib/types/task";
import { getTasks } from "@/actions/tasks";
import _ from "lodash";

type TaskContextProps = {
  projects: Project[];
  selectedProject: Project | null;
  tasks: { [key: string]: Task[] };
  mutateTasks: () => void;
  handleRepositionTask: (args: {
    taskId: number;
    workflow_id: string;
    position: number;
  }) => void;
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
  const [tasks, setTasks] = useState<{ [key: string]: Task[] }>({});
  const searchParams = useSearchParams();
  const projectId = searchParams.get("project");

  const { data: tasksData, mutate: mutateTasks } = useApi<{
    data: Task[] | null;
  }>({
    url: "/tasks",
    condition: !selectedProject || loadingTeams ? false : true,
    fetcher: () => getTasks(selectedProject?.id!),
  });

  const _tasks = useMemo(() => tasksData?.data || [], [tasksData]);

  const { data, loading } = useApi<{ data: Project[] | null }>({
    url: "/projects",
    condition: !selectedTeam || loadingTeams ? false : true,
    fetcher: () => getProjects(selectedTeam?.id!),
  });

  const projects = useMemo(() => data?.data || [], [data]);

  const handleRepositionTask = (args: {
    taskId: number;
    workflow_id: string;
    position: number;
  }) => {
    const { taskId, workflow_id, position } = args;

    const _tasks = tasks[workflow_id];
    const task = _tasks.find((t) => t.id === taskId);
    if (!task) return;

    const newTasks = _tasks.filter((t) => t.id !== taskId);
    newTasks.splice(position, 0, task);

    setTasks({ ...tasks, [workflow_id]: newTasks });
  };

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

  useEffect(() => {
    const grouped = _.groupBy(_tasks, "workflow_id");
    setTasks(grouped);
  }, [_tasks]);

  const value = {
    projects,
    selectedProject,
    tasks,
    mutateTasks,
    handleRepositionTask,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
