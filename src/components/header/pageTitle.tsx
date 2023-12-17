"use client";

import { usePathname } from "next/navigation";
import React from "react";

const PageTitle = () => {
  const pathName = usePathname();
  const pathNameParts = pathName.split("/");

  let title = pathNameParts[1] || "Dashboard";

  if (pathNameParts[1] === "dashboard") {
    if (!pathNameParts[2]) {
      title = "Overview";
    } else {
      title =
        pathNameParts[2]?.replace(/-/g, " ")?.charAt(0).toUpperCase() +
          pathNameParts[2]?.replace(/-/g, " ")?.slice(1) || "Dashboard";
    }
  }

  return <h1 className="text-2xl">{title}</h1>;
};

export default PageTitle;
