import CoverPictureControls from "@/components/projects/coverPictureControls";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import React from "react";

import ProjectsTable from "@/components/projects/projectsTable";
import ProjectDetails from "@/components/projects/projectDetails";
import ProjectSidebar from "@/components/projects/sidebar";

const EditProject = () => {
  return (
    <div className="relative">
      <div className="relative">
        <div className="bg-blue-500 h-60 w-full flex justify-end p-4">
          <div className="">
            <CoverPictureControls />
          </div>
        </div>
        <div className="rounded-sm bg-white w-28 h-28 absolute -bottom-12 left-10 overflow-hidden">
          <Avatar className="mr-2 w-28 h-28 rounded-none">
            <AvatarImage
              src={`https://avatar.vercel.sh/1.png`}
              alt="Project name"
              className="grayscale"
            />
          </Avatar>
        </div>
      </div>
      <div className="flex px-10 pt-20 gap-10">
        <ProjectDetails />
        <ProjectSidebar />
      </div>
      <div className="px-10 mt-10 mb-10">
        <h3 className="my-4">
          Tasks <span className="text-xs text-gray-500">(12)</span>
        </h3>
        <ProjectsTable />
      </div>
    </div>
  );
};

export default EditProject;
