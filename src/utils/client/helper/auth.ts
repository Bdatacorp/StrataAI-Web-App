import authController from "@/server/app/auth/auth.controller";
import {
  CreateUserDto,
  LoginDto,
  UserPayload,
  UserRoles,
  UserType,
} from "@/server/app/auth/auth.types";
import sessionController from "@/server/app/session/session.controller";
import { InitSessionDto } from "@/server/app/session/session.types";
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
export const authConfig = {
  providers: [
    CredentialsProvider({
      id: "adminLogin",
      name: "adminLogin",
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
        acceptTerms: { type: "checkbox" },
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
    CredentialsProvider({
      id: "validateUser",
      name: "validateUser",
      credentials: {
        email: { type: "text" },
      },
      async authorize(credentials, req) {
        const res = await authController.validateUser(
          credentials?.email as string
        );

        console.log(res);

        if ("zodErrors" in res || ("status" in res && !res.status)) {
          throw new Error(JSON.stringify(res));
        }

        if ("status" in res && res.payload.data) {
          const userPayload: UserPayload = res.payload.data;
          return userPayload;
        }

        return null;
      },
    }),
    CredentialsProvider({
      id: "initSession",
      name: "Init Session By State",
      credentials: {
        stateId: { type: "text" },
      },
      async authorize(credentials, req) {
        const res: any = await sessionController.createSession(
          credentials as InitSessionDto
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
    CredentialsProvider({
      id: "retrieveSession",
      name: "Retrieve Session By Session ID",
      credentials: {
        sessionId: { type: "text" },
      },
      async authorize(credentials, req) {
        if (!credentials?.sessionId) return null;

        const res: any = await sessionController.retrieveSession(
          credentials?.sessionId
        );

        if (res.status && res.data) {
          const userPayload: UserPayload = res.data;
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
  return getServerSession(...args, authConfig);
}
