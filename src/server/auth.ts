import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { getServerSession, type NextAuthOptions } from "next-auth";
import { type Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";

import { env } from "@/env";
import { db } from "@/server/db";
import { createTable } from "@/server/db/schema";
import { loginQuery } from "./api/managers/auth/loginQuery";
import type { User } from "@/types/users";

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, token }) => {
      if (token) {
        session.user.id = token.id;
        session.user.businessId = token.userBusinessId;
        session.user.role = token.userRole;
      }
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      session.user.timezone = timezone;
      return session;
    },
    jwt: ({ token, account, user }) => {
      if (account) {
        const dbUser = user as User;
        token.accessToken = account.access_token;
        token.id = user.id;
        token.userBusinessId = dbUser.businessId;
        token.userRole = dbUser.role;
      }
      return token;
    },
  },
  adapter: DrizzleAdapter(db, createTable) as Adapter,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        return await loginQuery.login({
          email: credentials?.email ?? "",
          password: credentials?.password ?? "",
        });
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: env.NEXTAUTH_SECRET,
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
