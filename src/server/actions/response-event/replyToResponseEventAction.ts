"use server";

import responseEventController from "@/server/app/response-event/response-event.controller";
import {
  CreateResponseEventDto,
  ReplyEventDto,
} from "@/server/app/response-event/response-event.types";

export default async function replyToResponseEventAction(
  replyEventDto: ReplyEventDto
) {
  const res = await responseEventController.replyToResponseEventAction(
    replyEventDto
  );
  return res;
}
