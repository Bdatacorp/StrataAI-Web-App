"use server";

import sessionController from "@/server/app/session/session.controller";

export default async function revalidateSessionAction() {
  await sessionController.revalidateSessionMessages();
  return;
}
