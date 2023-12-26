"use server";
import { projectSchema } from "@/lib/schemas/project";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import * as z from "zod";

export const getCoverImages = async () => {
  const bucketName = process.env.NEXT_PUBLIC_SUPABASE_COVER_PICS_BUCKET;
  const supabase = createRouteHandlerClient({ cookies });
  const { data: images, error } = await supabase.storage
    .from(`${bucketName!}`)
    .list("projects/images", {
      limit: 100,
    });

  const { data: gradients } = await supabase.storage
    .from(`${bucketName!}`)
    .list("projects/colors-gradients", {
      limit: 100,
    });

  const imagesWithUrl = images?.map((image) => {
    return {
      ...image,
      url: `https://kiewgpfwahhspgyatosl.supabase.co/storage/v1/object/public/${bucketName!}/projects/images/${
        image.name
      }`,
    };
  });
  const gradientsWithUrl = gradients?.map((gradient) => {
    return {
      ...gradient,
      url: `https://kiewgpfwahhspgyatosl.supabase.co/storage/v1/object/public/${bucketName!}/projects/colors-gradients/${
        gradient.name
      }`,
    };
  });

  const data = [...(imagesWithUrl || []), ...(gradientsWithUrl || [])];
  return { data, error };
};

export const createProject = async (
  project: z.infer<typeof projectSchema>,
  team_id: string
) => {
  const supabase = createRouteHandlerClient({ cookies });
  const { data: projects, error: existError } = await supabase
    .from("projects")
    .select("name")
    .eq("team_id", team_id);

  if (existError) {
    return { data: null, error: existError };
  }

  if (
    projects?.some((p) => p.name.toLowerCase() === project.name.toLowerCase())
  ) {
    return {
      data: null,
      error: {
        message: "Project with this name already exists.",
      },
    };
  }

  const { data, error } = await supabase
    .from("projects")
    .insert({ ...project, team_id });
  console.log(data, error);
  return { data, error };
};

export const getProjects = async (team_id: string) => {
  const supabase = createRouteHandlerClient({ cookies });
  const { data, error } = await supabase
    .from("projects")
    .select()
    .eq("team_id", team_id);
  return { data, error };
};
