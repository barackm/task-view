"use client";
import React from "react";
import { Input } from "../ui/input";
import UserNav from "./userNav";
import TeamSwitcher from "./team-switcher";
import PageTitle from "./pageTitle";
import { useUiStore } from "@/store/ui";
import { cn } from "@/lib/utils";
import { useAuth } from "../contexts/authContext";

const Header = () => {
  const { isSidebarOpen } = useUiStore();

  return (
    <div
      className={cn(
        "bg-white h-14 right-0 flex items-center fixed left-64 top-0 flex-col border-b border-gray-200",
        !isSidebarOpen && "left-16"
      )}
    >
      <div className="flex-1 w-full px-4 flex items-center">
        <div className="flex-1">
          <PageTitle />
        </div>
        <div className="flex gap-4 items-center">
          <Input placeholder="Search..." />
          <TeamSwitcher />
          <UserNav />
        </div>
      </div>
    </div>
  );
};

export default Header;
