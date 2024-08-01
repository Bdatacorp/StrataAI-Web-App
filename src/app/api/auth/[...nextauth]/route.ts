
import { config } from "@/utils/helper/auth";
import NextAuth, { AuthOptions } from "next-auth";

const handler = NextAuth(config);

export { handler as GET, handler as POST };
