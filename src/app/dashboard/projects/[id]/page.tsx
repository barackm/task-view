import CoverPictureControls from "@/components/projects/coverPictureControls";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import React from "react";

import ProjectsTable from "@/components/projects/projectsTable";
import ProjectDetails from "@/components/projects/projectDetails";
import ProjectSidebar from "@/components/projects/sidebar";
import ProjectForm from "@/components/projects/projectForm";
import Image from "next/image";
import CoverImage from "@/components/projects/coverImage";
import TasksList from "@/components/projects/tasksList";

type Props = {
  params: {
    id: string;
  };
};

const EditProject = (props: Props) => {
  const { id } = props.params;
  const isNew = id === "new";

  return (
    <div className="relative pb-4">
      <div className="relative">
        <CoverImage />
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
      <ProjectForm>
        <div className="flex px-10 pt-20 gap-10">
          <ProjectDetails />
          <ProjectSidebar />
        </div>
      </ProjectForm>
      {!isNew && (
        <div className="px-10 mt-10 mb-10">
          <h3 className="my-4">
            Tasks <span className="text-xs text-gray-500">(12)</span>
          </h3>
          <TasksList />
        </div>
      )}
    </div>
  );
};

export default EditProject;
