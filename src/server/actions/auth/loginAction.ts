"use server";

import { LoginDto } from "@/server/app/auth/auth.types";
import authController from "@/server/app/auth/auth.controller";

export default async function logineAction(email: string, password: string) {
  const loginDto: LoginDto = {
    email,
    password,
  };
  const res: any = await authController.login(loginDto);
  console.log(res);
  
  return res;
}
