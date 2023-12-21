import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";

import "./globals.css";
import { cn } from "@/lib/utils";
import { SupabaseProvider } from "@/components/contexts/supabaseContext";
import { AuthProvider } from "@/components/contexts/authContext";

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
            <Toaster />
            {children}
          </AuthProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
