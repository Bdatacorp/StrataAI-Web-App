import { cookies } from "next/headers";

class ServerToken {
  static getAuth(): string {
    "use server";
    return this.getToken("token");
  }

  static setAuth(token: string) {
    "use server";
    return this.setToken("token", token);
  }

  private static setToken(name: string, token: string) {
    "use server";
    const cookieStore = cookies();
    cookieStore.set(name, token);
  }

  private static getToken(name: string): string {
    "use server";
    const cookieStore = cookies();
    const token = cookieStore.get(name)?.value;
    return token as string;
  }
}

export default ServerToken;
