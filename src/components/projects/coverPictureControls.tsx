"use client";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Link from "next/link";
import { useApi } from "@/hooks/useApi";
import { getCoverImages } from "@/actions/projects";

const CoverPictureControls = () => {
  const { data } = useApi({
    url: "",
    fetcher: getCoverImages,
  });

  console.log(data);

  const colors = [
    { name: "Red Solid", class: "bg-red-500" },
    { name: "Blue Solid", class: "bg-blue-500" },
    { name: "Green Solid", class: "bg-green-500" },
    { name: "Yellow Solid", class: "bg-yellow-500" },
    { name: "Purple Solid", class: "bg-purple-500" },
    {
      name: "Red to Yellow Gradient",
      class: "bg-gradient-to-r from-red-500 to-yellow-500",
    },
    {
      name: "Blue to Green Gradient",
      class: "bg-gradient-to-r from-blue-500 to-green-500",
    },
    {
      name: "Purple to Pink Gradient",
      class: "bg-gradient-to-r from-purple-500 to-pink-500",
    },
    {
      name: "Green to Blue Gradient",
      class: "bg-gradient-to-r from-green-500 to-blue-500",
    },
    {
      name: "Pink to Yellow Gradient",
      class: "bg-gradient-to-r from-pink-500 to-yellow-500",
    },
  ];

  const images = [];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary" size="sm" className="h-6 rounded-sm">
          Change cover
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit mr-4 p-2">
        <Tabs defaultValue="color-gradient" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="color-gradient">Color & Gradient</TabsTrigger>
            <TabsTrigger value="upload">Upload Image</TabsTrigger>
          </TabsList>
          <TabsContent value="color-gradient">
            <Link
              href="https://www.pexels.com/search/gradient/"
              className="text-xs font-medium mb-2 block hover:underline"
            >
              Gradients
            </Link>
            <div className="flex flex-wrap gap-1">
              {colors.map((color) => (
                <div
                  key={color.name}
                  className={`h-12 w-20 rounded-sm ${color.class}`}
                ></div>
              ))}
            </div>
            <Link
              href="https://www.pexels.com/search/gradient/"
              className="text-xs font-medium my-2 block hover:underline"
            >
              Images
            </Link>
          </TabsContent>
          <TabsContent value="upload"></TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
};

export default CoverPictureControls;

// /
