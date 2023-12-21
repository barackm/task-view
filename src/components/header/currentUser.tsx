"use client";
import { useAuthStore } from "@/store/auth";
import React from "react";
import { useAuth } from "../contexts/authContext";

const CurrentUser = () => {
  const { user } = useAuth();
  console.log({ user });

  return <div>CurrentUser</div>;
};

export default CurrentUser;
