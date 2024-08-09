import { auth } from "@/utils/client/helper/auth";

export default class ServerToken {
  async getUserToken(): Promise<string> {
    "use server";
    const session = await auth();
    const token = session?.user.token;

    if (!token) throw Error("Unauthozied. Couldn't found user");
    return token;
  }

  async getSessionToken(): Promise<string> {
    "use server";
    const session = await auth();
    const sessionToken = session?.user.sessionToken;

    if (!sessionToken) throw Error("Couldn't found user session");
    return sessionToken;
  }
}
