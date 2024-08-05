import authController from "@/server/app/auth/auth.controller";
import {
  CreateUserDto,
  LoginDto,
  UserPayload,
  UserRoles,
  UserType,
} from "@/server/app/auth/auth.types";
import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// You'll need to import and pass this
// to `NextAuth` in `app/api/auth/[...nextauth]/route.ts`
export const config = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const res: any = await authController.adminLogin(
          credentials as LoginDto
        );

        if (res.zodErrors || !res.status) {
          throw new Error(JSON.stringify(res));
        }

        // Any object returned will be saved in `user` property of the JWT
        if (res.payload.data) {
          const userPayload: UserPayload = res.payload.data;
          return userPayload;
        }

        // Return null if user data could not be retrieved
        return null;
      },
    }),
    CredentialsProvider({
      id: "register",
      name: "RegisterUser",
      credentials: {
        id: { type: "text" },
        name: { type: "text" },
        email: { type: "text" },
        type: { type: "text" },
        phone: { type: "text" },
        stateId: { type: "text" },
      },
      async authorize(credentials, req) {
        const res: any = await authController.registerUser(
          credentials as CreateUserDto
        );

        if (res.zodErrors || !res.status) {
          throw new Error(JSON.stringify(res));
        }

        if (res.payload.data) {
          const userPayload: UserPayload = res.payload.data;
          return userPayload;
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user as UserPayload;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = token.user;
      }
      return session;
    },
  },
  session: {
    maxAge: 24 * 60 * 60,
    updateAge: 5 * 60,
  },
} satisfies NextAuthOptions;

// Use it in server contexts
export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, config);
}
