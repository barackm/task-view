import { createContext, useContext } from "react";

type TaskContextProps = {};

const TaskContext = createContext<TaskContextProps | null>(null);

export const useTaskContext = () => {
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
  const value = {};

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
