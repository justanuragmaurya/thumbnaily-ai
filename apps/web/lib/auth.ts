import NextAuth, {
  type NextAuthConfig,
  type Session,
  type User as NextAuthUser, // Aliased for clarity and to use augmented User type
  type Account,
  type Profile,
} from "next-auth";
import type { JWT } from "next-auth/jwt"; // Specific import for JWT type
import Google from "next-auth/providers/google";
import db from "@repo/db";

// Define your NextAuth configuration.
// With next-auth.d.ts in place, the Session, User, and JWT types in callbacks
// will refer to your augmented types.
const authConfig = {
  session: {
    strategy: "jwt",
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({
      user,
      account,
      profile,
    }: {
      user: NextAuthUser;
      account?: Account | null | undefined; // MODIFIED: account property is now optional
      profile?: Profile;
    }) {
      if (account?.provider === "google") {
        const email = profile?.email;
        if (!email) {
          throw new Error("No profile email found.");
        }
        const avatarUrl = profile?.image ?? (profile as any)?.picture ?? null;
        const name = profile?.name ?? email;

        await db.user.upsert({
          where: { email: email },
          create: {
            email: email,
            name: name,
            avatar: avatarUrl,
          },
          update: {
            name: name,
            avatar: avatarUrl,
          },
        });
      }
      return true;
    },
    async jwt({ token, user }: { token: JWT; user?: NextAuthUser }) {
      if (user?.id) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);