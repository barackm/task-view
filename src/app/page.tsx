import CurrentUser from "@/components/header/currentUser";
import Image from "next/image";
import { LuLoader2 } from "react-icons/lu";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex items-center justify-center">
        <LuLoader2 className="animate-spin text-2xl" />
      </div>
    </main>
  );
}
