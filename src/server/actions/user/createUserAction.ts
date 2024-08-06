"use server";

import authController from "@/server/app/auth/auth.controller";
import { CreateUserDto } from "@/server/app/auth/auth.types";
import usersController from "@/server/app/users/users.controller";

export default async function createUserAction(createUserDto: CreateUserDto) {
  const res: any = await authController.registerUser(createUserDto);
  return res;
}
