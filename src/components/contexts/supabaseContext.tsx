"use client";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import type { SupabaseClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

type SupabaseContext = {
  supabase: SupabaseClient;
};

const SupabaseContext = createContext<SupabaseContext | null>(null);

export const useSupabase = () => {
  const context = useContext(SupabaseContext);
  if (context === null) {
    throw new Error("useSupabase must be used within a SupabaseProvider");
  }
  return context;
};

type Props = {
  children: React.ReactNode;
};

export const SupabaseProvider = ({ children }: Props) => {
  const router = useRouter();
  const [supabase] = useState(() => createPagesBrowserClient());

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      router.refresh();
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [router, supabase]);

  return (
    <SupabaseContext.Provider value={{ supabase }}>
      {children}
    </SupabaseContext.Provider>
  );
};
