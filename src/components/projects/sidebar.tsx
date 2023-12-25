"use client";
import React from "react";
import { LuUser } from "react-icons/lu";
import { IconContext } from "react-icons";
import { LuCalendarDays } from "react-icons/lu";
import { LuActivitySquare } from "react-icons/lu";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { FaWandMagicSparkles } from "react-icons/fa6";
import DateRangePicker from "./dateRangePicker";
import { Progress } from "@/components/ui/progress";
import { useParams } from "next/navigation";
import { useProjectForm } from "./projectForm";

const ProjectSidebar = () => {
  const { form, onSubmit } = useProjectForm();
  const { register, handleSubmit, setValue, getValues } = form;
  const { id } = useParams<{ id: string }>();
  const isNew = id === "new";

  const asideItems = [
    {
      label: "Owner",
      icon: <LuUser />,
      value: (
        <>
          <Avatar className="mr-2 w-8 h-8 rounded-full">
            <AvatarImage
              src={`https://avatar.vercel.sh/1.png`}
              alt="Project name"
              className="grayscale"
            />
          </Avatar>
          <span className="text-xs font-medium">Barack Mukelenga</span>
        </>
      ),
    },
    {
      label: "Dates",
      icon: <LuCalendarDays />,
      value: (
        <DateRangePicker
          value={getValues("dates")}
          onChange={(dates) => setValue("dates", dates)}
        />
      ),
    },
    {
      label: "Progress",
      icon: <LuActivitySquare />,
      value: (
        <div className="flex w-full items-center gap-2">
          <Progress value={isNew ? 0 : 33} className="flex-1" />
          <span className="text-xs font-medium">{isNew ? "0%" : "33%"}</span>
        </div>
      ),
    },
  ];

  return (
    <aside className="w-2/6 sticky top-16">
      <ul className="flex flex-col gap-2">
        {asideItems.map((item) => (
          <li className="flex items-center gap-2" key={item.label}>
            <div className="flex w-2/5 gap-2 items-center text-gray-600 px-2 py-1 hover:bg-gray-300 rounded-sm cursor-pointer">
              <IconContext.Provider value={{ className: "text-xl" }}>
                {item.icon}
              </IconContext.Provider>
              <span className="text-xs font-medium">{item.label}</span>
            </div>
            <div className="flex items-center w-3/5 text-xs font-medium">
              {item.value}
            </div>
          </li>
        ))}
      </ul>
      {!isNew && (
        <div className="my-4">
          <Button size="sm" className="flex items-center gap-2">
            <IconContext.Provider value={{ className: "text-xl text" }}>
              <FaWandMagicSparkles />
            </IconContext.Provider>
            Get AI generated tasks
          </Button>
        </div>
      )}
    </aside>
  );
};

export default ProjectSidebar;
