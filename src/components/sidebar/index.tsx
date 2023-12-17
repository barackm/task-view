"use client";
import React from "react";
import Link from "next/link";
import { IconContext } from "react-icons";
import { CgMenuGridO } from "react-icons/cg";
import { LuPanelLeftClose } from "react-icons/lu";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { SlBell } from "react-icons/sl";
import { GoChecklist } from "react-icons/go";
import { FiUsers } from "react-icons/fi";

const Sidebar = () => {
  const isActive = false;

  const getActiveLink = (path?: string) => {
    return false;
  };

  const links = [
    {
      name: "Overview",
      path: "/dashboard",
      icon: CgMenuGridO,
    },
    {
      name: "Tasks",
      path: "/dashboard/tasks",
      icon: GoChecklist,
    },
    {
      name: "Notifications",
      path: "/dashboard/notifications",
      icon: SlBell,
    },
    {
      name: "Team Members",
      path: "/dashboard/team-members",
      icon: FiUsers,
    },
  ];

  return (
    <div className="bg-white h-full w-64 px-4 py-4 fixed left-0 top-0 bottom-0 border-r border-r-gray-200 flex flex-col">
      <div className="flex-1">
        <div className="flex items-center">
          <p className="text-2xl font-semibold flex-1">
            Task<span className="text-blue-600">View</span>
          </p>
          <Button size="icon" variant="ghost">
            <IconContext.Provider
              value={{ className: "text-xl text-gray-500" }}
            >
              <LuPanelLeftClose />
            </IconContext.Provider>
          </Button>
        </div>
        <div className="my-5">
          <p className="font-medium text-sm text-gray-500">Menu</p>
        </div>
        <ul className="flex flex-col">
          {links.map((link) => (
            <li key={link.name} className="flex items-center justify-center">
              <Link
                href={link.path}
                className={cn(
                  "flex w-full items-center gap-4 py-2 px-2 rounded-sm hover:bg-gray-100",
                  getActiveLink() && "bg-gray-100"
                )}
              >
                <div>
                  <IconContext.Provider
                    value={{
                      className: cn(
                        "text-xl text-gray-500",
                        getActiveLink() && "text-gray-800"
                      ),
                    }}
                  >
                    <link.icon />
                  </IconContext.Provider>
                </div>
                <p
                  className={cn(
                    "text-sm font-medium text-gray-500",
                    getActiveLink() && "text-gray-800"
                  )}
                >
                  {link.name}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="sticky bottom-0 left-0 right-0">Sticky</div>
    </div>
  );
};

export default Sidebar;
