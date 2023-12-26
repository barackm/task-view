"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import ProjectSwitcher from "./projectSwitcher";

const Tabs = () => {
  const searchParams = useSearchParams();
  const tabName = searchParams.get("tab")?.toString();

  const router = useRouter();

  const tabs = [
    {
      name: "List",
      path: "/dashboard/tasks",
    },
    {
      name: "Board",
      path: "/dashboard/tasks/board",
    },
    {
      name: "Calendar",
      path: "/dashboard/tasks/calendar",
    },
  ];

  useEffect(() => {
    if (!tabName) {
      router.push("/dashboard/tasks?tab=board");
    }
  }, [tabName, router]);

  return (
    <div className="w-full z-40 bg-white border-b border-gray-200 h-10 px-4 sticky top-14 flex">
      <ul className="flex h-full items-end flex-1">
        {tabs.map((tab) => (
          <li
            key={tab.name}
            className={cn(
              "border-b-2 border-transparent",
              tab.name.toLowerCase() === tabName
                ? "border-b-2 border-primary"
                : "text-gray-500 hover:text-gray-700",
              "cursor-pointer"
            )}
          >
            <Link
              href={`/dashboard/tasks?tab=${tab.name.toLowerCase()}`}
              className="px-4 py-2 block text-xs font-medium text-gray-700"
            >
              {tab.name}
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex items-center">
        <ProjectSwitcher />
      </div>
    </div>
  );
};

export default Tabs;
