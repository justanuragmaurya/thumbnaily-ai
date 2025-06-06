"use client";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function AccountPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  if (status === "authenticated") {
    return (
      <div className="h-screen flex flex-col w-full items-center justify-center">
        <div className="flex flex-col items-center justify-center w-full py-8 px-4 bg-background rounded-lg shadow-md mx-auto max-w-md border">
          <Image
            src={session.user.image || "/default-avatar.png"}
            width={120}
            height={120}
            alt="Profile image"
            className="rounded-full border-4 border-blue-500 shadow-lg mb-4 object-cover"
          />
          <p className="text-2xl font-semibold text-gray-800 dark:text-white mb-1">
            {session.user.name}
          </p>
          <p className="text-gray-500 dark:text-gray-300 mb-6">
            {session.user.email}
          </p>
          <Button
            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded shadow"
            onClick={() => {
              signOut({ callbackUrl: "/" });
            }}
          >
            Sign Out
          </Button>
        </div>
      </div>
    );
  }
}
