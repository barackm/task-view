import { TaskProvider } from "@/contexts/tasksContext";
import React from "react";

type Props = {
  children: React.ReactNode;
};
const TasksLayout = (props: Props) => {
  const { children } = props;
  return <TaskProvider>{children}</TaskProvider>;
};

export default TasksLayout;
