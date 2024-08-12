"use server";

import chatController from "@/server/app/chat/chat.controller";

export default async function askQuestionAction(
  text: string,
) {
  const res = await chatController.askQuestion({ text });
  return res;
}
