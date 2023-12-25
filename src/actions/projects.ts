"use server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

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
