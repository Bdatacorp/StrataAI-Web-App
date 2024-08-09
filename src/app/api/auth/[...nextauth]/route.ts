
import { authConfig } from "@/utils/client/helper/auth";
import NextAuth, { AuthOptions } from "next-auth";

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };
