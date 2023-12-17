"use client";
import { useAuthStore } from "@/store/auth";
import React from "react";

const CurrentUser = () => {
  const { currentUser } = useAuthStore();
  console.log({ currentUser });

  return <div>CurrentUser</div>;
};

export default CurrentUser;
