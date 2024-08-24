"use server";

import usersController from "@/server/app/users/users.controller";

export default async function createMessageToken(userId: string) {
  const res = await usersController.createMessageToken(userId);
  return res;
}
