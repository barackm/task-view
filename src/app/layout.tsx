import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";

import "./globals.css";
import { cn } from "@/lib/utils";
import { SupabaseProvider } from "@/contexts/supabaseContext";
import { AuthProvider } from "@/contexts/authContext";
import { TeamProvider } from "@/contexts/teamsContext";
import { TaskProvider } from "@/contexts/tasksContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Task View",
  description: "AI powered task management app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "bg-gray-100")}>
        <SupabaseProvider>
          <AuthProvider>
            <TeamProvider>
              <TaskProvider>
                <Toaster />
                {children}
              </TaskProvider>
            </TeamProvider>
          </AuthProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
