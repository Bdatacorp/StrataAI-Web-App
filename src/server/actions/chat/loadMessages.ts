"use server";

import chatController from "@/server/app/chat/chat.controller";

export default async function loadChatMessages(token: string) {
  const res = await chatController.loadMessages(token);
  return res;
}
