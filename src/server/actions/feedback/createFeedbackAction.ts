"use server";

import chatController from "@/server/app/chat/chat.controller";
import { CreateFeedbackDto } from "@/server/app/chat/chat.types";

export default async function createFeedbackAction(
  createFeedbackDto: CreateFeedbackDto
) {
  const res = await chatController.createFeedback(createFeedbackDto);
  return res;
}
