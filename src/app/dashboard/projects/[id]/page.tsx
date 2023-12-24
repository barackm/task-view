import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import React from "react";

const EditProject = () => {
  return (
    <div className="">
      <div className="relative">
        <div className="bg-blue-500 h-60 w-full flex justify-end p-4">
          <div className=""></div>
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
    </div>
  );
};

export default EditProject;
