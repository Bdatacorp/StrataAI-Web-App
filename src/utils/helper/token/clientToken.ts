'use client'

import Cookies from "js-cookie";

class ClientToken {
  static getAuth(): string {
    return this.getToken("token");
  }

  static setAuth(token: string) {
    return this.setToken("token", token);
  }

  private static setToken(name: string, token: string) {
    Cookies.set("token", token);
  }

  private static getToken(name: string): string {
    const token = Cookies.get(name);
    return token as string;
  }
}

export default ClientToken;
