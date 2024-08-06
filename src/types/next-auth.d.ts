import { UserPayload } from "@/server/app/auth/auth.types";
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: UserPayload;
  }

  interface User extends UserPayload {}
}

declare module "next-auth/jwt" {
  interface JWT {
    user: UserPayload;
  }
}
