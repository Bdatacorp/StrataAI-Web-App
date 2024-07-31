"use client";

class Token {
  static getAuth(): string {
    return this.getToken("token");
  }

  static setAuth(token: string) {
    return this.setToken("token", token);
  }

  private static setToken(name: string, token: string) {
    localStorage.setItem(name, token);
  }

  private static getToken(name: string): string {
    return localStorage.getItem(name) || "";
  }
}

export default Token;
