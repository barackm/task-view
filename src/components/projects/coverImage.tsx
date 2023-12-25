import React from "react";
import CoverPictureControls from "./coverPictureControls";
import Image from "next/image";

const CoverImage = () => {
  return (
    <div className="h-60 w-full flex justify-end p-4">
      <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-50 z-10" />
      <Image
        src="/assets/img/image-13.jpg"
        layout="fill"
        objectFit="cover"
        alt="Project name"
      />
      <div className="z-20">
        <CoverPictureControls />
      </div>
    </div>
  );
};

export default CoverImage;
