"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { Sora } from "next/font/google";
import { LogOut, Mail, User } from "lucide-react";

const sora = Sora({
  subsets: ["latin"],
  weight: ["600", "700"],
});

export default function AccountPage() {
  const { data: session, status } = useSession();

  if (status !== "authenticated") return null;

  return (
    <div className="min-h-full flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="rounded-2xl border border-border/50 bg-card/30 p-8 text-center">
          <div className="flex justify-center mb-5">
            {session.user.image ? (
              <Image
                src={session.user.image}
                width={80}
                height={80}
                alt="Profile"
                className="rounded-full border-2 border-border/50 object-cover"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
                <User className="h-8 w-8 text-muted-foreground" />
              </div>
            )}
          </div>

          <h1 className={`text-xl font-bold tracking-tight ${sora.className}`}>
            {session.user.name}
          </h1>

          <div className="flex items-center justify-center gap-1.5 mt-1.5 text-sm text-muted-foreground">
            <Mail className="h-3.5 w-3.5" />
            {session.user.email}
          </div>

          <div className="mt-8 pt-6 border-t border-border/50">
            <button
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors cursor-pointer"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
