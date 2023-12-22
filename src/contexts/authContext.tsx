"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useSupabase } from "./supabaseContext";

export interface User {
  id: string;
  factors: any;
  aud: string;
  iat: number;
  iss: string;
  email: string;
  phone: string;
  app_metadata: AppMetadata;
  user_metadata: UserMetadata;
  role: string;
  aal: string;
  amr: Amr[];
  session_id: string;
}

export interface AppMetadata {
  provider: string;
  providers: string[];
}

export interface UserMetadata {
  avatar_url: string;
  email: string;
  email_verified: boolean;
  full_name: string;
  iss: string;
  name: string;
  phone_verified: boolean;
  picture: string;
  provider_id: string;
  sub: string;
}

export interface Amr {
  method: string;
  timestamp: number;
}

type AuthContext = {
  user: User | null;
};

const AuthContext = createContext<AuthContext | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

type Props = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const { supabase } = useSupabase();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          getCurrentUser(session);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase]);

  const getCurrentUser = async (session: any) => {
    try {
      const currentUser = await session.user;
      if (currentUser) {
        setUser(currentUser);
      }
    } catch (error) {}
  };

  const value = {
    user,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};
