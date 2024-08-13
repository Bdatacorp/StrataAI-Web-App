"use server";

import chatController from "@/server/app/chat/chat.controller";
import {
  CreateFeedbackDto,
  CreateResponseEventDto,
} from "@/server/app/chat/chat.types";

export default async function createResponseEvent(
  createResponseEventDto: CreateResponseEventDto
) {
  const res = await chatController.createEvent(createResponseEventDto);
  return res;
}
