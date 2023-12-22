"use client";
import { useAuthStore } from "@/store/auth";
import React from "react";
import { useAuth } from "../../contexts/authContext";

const CurrentUser = () => {
  const { user } = useAuth();

  return <div>CurrentUser</div>;
};

export default CurrentUser;
