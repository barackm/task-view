"use client";
import { exchangeCodeForSession } from "@/actions/auth";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "sonner";

const AuthCallback = () => {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const router = useRouter();

  useEffect(() => {
    if (!code) return;
    exchangeCode(code);
  }, [code]);

  const exchangeCode = async (code: string) => {
    try {
      await exchangeCodeForSession(code);
      router.push("/dashboard/tasks");
    } catch (error: any) {
      toast.error(error.message);
      router.push("/login");
    }
  };

  return <div>AuthCallback</div>;
};

export default AuthCallback;
