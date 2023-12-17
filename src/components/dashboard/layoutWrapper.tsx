"use client";
import { cn } from "@/lib/utils";
import { useUiStore } from "@/store/ui";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const LayoutWrapper = (props: Props) => {
  const { children } = props;
  const { isSidebarOpen } = useUiStore();

  return (
    <div className={cn("ml-64 mt-14 h-full", !isSidebarOpen && "ml-16")}>
      {children}
    </div>
  );
};

export default LayoutWrapper;
