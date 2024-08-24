"use server";

import usersController from "@/server/app/users/users.controller";

export default async function deleteAdminAction(id: string) {
  const res: any = await usersController.deleteAdmin(id);
  return res;
}
