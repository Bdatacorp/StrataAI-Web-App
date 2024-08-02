import { auth } from "@/utils/client/helper/auth";

export default class ServerToken {

  async getUserToken(): Promise<string> {
    const session = await auth();
    const token = session?.user.token;

    if (!token) throw Error("Unauthozied. Couldn't found user session");
    return token;
  }
}
