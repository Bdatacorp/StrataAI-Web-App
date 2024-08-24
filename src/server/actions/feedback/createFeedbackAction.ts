"use server";

import chatController from "@/server/app/chat/chat.controller";
import { CreateFeedbackDto } from "@/server/app/feedback/feedback.types";
import feedbackController from "@/server/app/feedback/feedbacks.controller";

export default async function createFeedbackAction(
  createFeedbackDto: CreateFeedbackDto
) {
  const res = await feedbackController.createFeedback(createFeedbackDto);
  return res;
}
