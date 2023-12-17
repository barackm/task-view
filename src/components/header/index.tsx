import React from "react";
import { Input } from "../ui/input";
import UserNav from "./userNav";
import TeamSwitcher from "./team-switcher";

const Header = () => {
  return (
    <div className="bg-white h-14 right-0 flex items-center fixed left-64 top-0 flex-col border-b border-gray-200">
      <div className="flex-1 w-full px-4 flex items-center">
        <div className="flex-1">
          <h1 className="text-2xl">Tasks</h1>
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
