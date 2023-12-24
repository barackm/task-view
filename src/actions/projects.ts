"use server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const getCoverImages = async () => {
  const bucketName = process.env.NEXT_PUBLIC_SUPABASE_COVER_PICS_BUCKET;
  const supabase = createRouteHandlerClient({ cookies });
  const { data, error } = await supabase.storage.from(bucketName!).list();
  console.log({ error });
  return { data, error };
};
