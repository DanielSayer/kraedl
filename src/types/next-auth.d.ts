import type { DefaultSession, User } from "next-auth";

type UserId = string;

declare module "next-auth/jwt" {
  interface JWT {
    id: UserId;
  }
}

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: User & {
      id: UserId;
    };
  }
}
