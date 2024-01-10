import React from "react";
import TaskActions from "./taskActions";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { IconContext } from "react-icons";
import { GoComment } from "react-icons/go";
import moment from "moment";
import Link from "next/link";
import { Task } from "@/lib/types/task";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

type Props = {
  task: Task;
};

const Task = (props: Props) => {
  const { task } = props;
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const badges = [
    {
      name: "Remember",
      color: "primary/30 text-blue-800", // Lighter blue background with dark text
    },
    {
      name: "Important",
      color: "red-200 text-red-800", // Lighter red background with dark text
    },
    {
      name: "Later",
      color: "gray-200 text-gray-800", // Lighter gray background with dark text
    },
  ];

  const styles = {
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      className="px-2 bg-white rounded-md shadow-sm ring-1 ring-gray-200 pb-2"
      ref={setNodeRef}
      {...attributes}
      style={styles}
    >
      <div className="flex items-center py-2">
        <p
          className="text-md cursor-grab flex-1 font-medium w-full truncate"
          {...listeners}
        >
          {task.name}
        </p>
        <TaskActions />
      </div>
      <div className="">
        <div className="flex flex-wrap gap-1">
          {badges.map((badge) => (
            <Badge
              key={badge.name}
              className={`bg-${badge.color} hover:bg-${
                badge.color.split(" ")[0]
              }-300`}
            >
              {badge.name}
            </Badge>
          ))}
        </div>
        <div className="text-sm line-clamp-2 my-2">{task.description}</div>
        <div className="flex justify-between items-center">
          <Avatar className="h-6 w-6">
            <AvatarImage
              src={task.user.avatar_url!}
              alt={task.user.full_name}
            />
            <AvatarFallback>
              {task.user.full_name.split(" ").map((name: any) => name[0])}
            </AvatarFallback>
          </Avatar>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">
              {moment(task.created_at).format("ll")}
            </span>
            <Link href="" className="flex items-center gap-1">
              <IconContext.Provider value={{ className: "text-sm" }}>
                <GoComment />
              </IconContext.Provider>
              <span className="text-xs text-gray-500">{2}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;
