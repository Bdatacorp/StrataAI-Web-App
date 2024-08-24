"use server";

import responseEventController from "@/server/app/response-event/response-event.controller";
import { CreateResponseEventDto } from "@/server/app/response-event/response-event.types";

export default async function createResponseEventAction(
  createResponseEventDto: CreateResponseEventDto
) {
  const res = await responseEventController.createEvent(createResponseEventDto);
  return res;
}
