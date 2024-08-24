"use server";

import usersController from "@/server/app/users/users.controller";
import { CreateAdminDto } from "@/server/app/users/users.types";

export default async function createAdminAction(
  createAdminDto: CreateAdminDto
) {
  const res = await usersController.createSystemUser(createAdminDto);
  return res;
}
