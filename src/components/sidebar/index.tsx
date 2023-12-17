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
import { useUiStore } from "@/store/ui";
import UserLink from "./userLink";
import { Separator } from "../ui/separator";

const Sidebar = () => {
  const { isSidebarOpen, toggleSidebar } = useUiStore();

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

  const isSidebarCollapsed = !isSidebarOpen;

  return (
    <div
      className={cn(
        "bg-white h-full w-64 px-4 py-4 fixed left-0 top-0 bottom-0 border-r border-r-gray-200 flex flex-col",
        isSidebarCollapsed && "w-16 px-2"
      )}
    >
      <div className="flex-1">
        <div
          className={cn(
            "flex items-center",
            isSidebarCollapsed && "flex-col justify-center"
          )}
        >
          <p className="text-2xl font-semibold flex-1">
            {!isSidebarCollapsed && (
              <>
                Task<span className="text-blue-600">View</span>
              </>
            )}
            {isSidebarCollapsed && (
              <>
                T<span className="text-blue-600">V</span>
              </>
            )}
          </p>
          <Button size="icon" variant="ghost" onClick={toggleSidebar}>
            <IconContext.Provider
              value={{ className: "text-xl text-gray-500" }}
            >
              <LuPanelLeftClose />
            </IconContext.Provider>
          </Button>
        </div>
        <div
          className={cn(
            "my-5 w-full px-2",
            isSidebarCollapsed && "tex-center flex items-center justify-center"
          )}
        >
          <p className="font-medium text-sm text-gray-500">Menu</p>
        </div>
        <ul className="flex flex-col gap-2">
          {links.map((link) => (
            <li key={link.name} className="flex items-center justify-center">
              <Link
                href={link.path}
                className={cn(
                  "flex w-full items-center gap-4 py-2 px-2 rounded-sm hover:bg-gray-100",
                  getActiveLink() && "bg-gray-100",
                  isSidebarCollapsed && "items-center px-0 justify-center"
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
                {!isSidebarCollapsed && (
                  <p
                    className={cn(
                      "text-sm font-medium text-gray-500",
                      getActiveLink() && "text-gray-800"
                    )}
                  >
                    {link.name}
                  </p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <Separator className="my-4" />
      <div className="sticky bottom-0 left-0 right-0">
        <div className="">
          <UserLink isSidebarCollapsed={isSidebarCollapsed} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
