"use server";

import responseEventController from "@/server/app/response-event/response-event.controller";
import {
  CreateResponseEventDto,
  ReplyEventDto,
} from "@/server/app/response-event/response-event.types";

export default async function verifyResponseEventAction(
  requestId: string
) {
  const res = await responseEventController.verifyResponseEventAction(requestId);
  return res;
}
