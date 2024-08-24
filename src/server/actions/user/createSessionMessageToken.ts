"use server";

import usersController from "@/server/app/users/users.controller";

export default async function createSessionMessageToken(
  token: string,
  sessionId: string
) {
  const res = await usersController.createSessionMessageToken(token, sessionId);
  return res;
}
