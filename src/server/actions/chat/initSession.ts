"use server";

import chatController from "@/server/app/chat/chat.controller";

export default async function initSession(token: string) {
  const res = await chatController.initiateSession(token);
  return res;
}
