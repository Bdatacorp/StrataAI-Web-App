"use server";

import authController from "@/server/app/auth/auth.controller";

export default async function validateUserAction(email: string) {
  const res = await authController.validateUser(email);
  return res;
}
