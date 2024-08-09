"use server";

import chatController from "@/server/app/chat/chat.controller";

export default async function askQuestionActionStream(text: string) {
  const res: any = await chatController.askQuestionStream({ text });
  return res;
}
