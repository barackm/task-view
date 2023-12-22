"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";
import { useSupabase } from "@/contexts/supabaseContext";

const Login = () => {
  const { supabase } = useSupabase();

  const handleLogin = async (provider: "google" | "github") => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: provider,
      options: { redirectTo: `${location.origin}/dashboard/tasks` },
    });

    if (error) {
      toast.error(error.message);
      return;
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center px-4 sm:px-0">
      <Card className="w-full sm:w-[380px] mt-10 sm:mt-[10%]">
        <CardHeader className="justify-center items-center">
          <CardTitle className="text-2xl tex-center">
            Welcome to Task<span className="text-blue-600">View</span>
          </CardTitle>
          <CardDescription>
            Please login to your account to continue
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <Button
            className="w-full"
            variant="outline"
            onClick={() => handleLogin("google")}
          >
            {/* {loading === "google" && <BiLoaderAlt className='animate-spin' />} */}
            <Image
              src="/assets/img/google-logo.png"
              width={20}
              height={20}
              alt="Google"
              className="mr-2"
            />
            Login with Google
          </Button>
          <Button
            className="w-full bg-black"
            onClick={() => handleLogin("github")}
          >
            {/* {loading === "github" && <BiLoaderAlt className='animate-spin' />} */}
            <Image
              src="/assets/img/github-mark-white.png"
              width={20}
              height={20}
              alt="Google"
              className="mr-2"
            />
            Login with Github
          </Button>

          <Separator className="my-3" />
          <p className="text-center text-gray-500 text-sm">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/register"
              className="text-blue-600 hover:underline font-semibold"
            >
              Register
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
