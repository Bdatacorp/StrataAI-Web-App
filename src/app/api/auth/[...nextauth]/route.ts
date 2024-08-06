
import { config } from "@/utils/client/helper/auth";
import NextAuth, { AuthOptions } from "next-auth";

const handler = NextAuth(config);

export { handler as GET, handler as POST };
