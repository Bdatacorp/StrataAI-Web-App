"use server";

import usersController from "@/server/app/users/users.controller";
import { UserCreateDto } from "@/server/app/users/users.types";

export default async function createUserAction(createUserDto: UserCreateDto) {
  const res: any = await usersController.registerUser(createUserDto);
  return res;
}
