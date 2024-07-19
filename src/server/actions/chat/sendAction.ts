"use server";

import { ChatFormState } from "@/components/modules/chat/types";
import chatController from "@/server/app/chat/chat.controller";
import { ChatCreateDto } from "@/server/app/chat/chat.types";
import askFromAssistant from "../openapi/assistant";

export default async function sendAction(
  prevState: ChatFormState,
  formData: FormData
) {
  const text = formData.get("text") as string;

  const message: ChatCreateDto = {
    text,
  };

  

  const res: any = await chatController.send(message);

  if (res?.errors) {
    return {
      ...prevState,
      errors: res?.errors,
    };
  }

  if (res.status) {
    return {
      ...prevState,
      status: res.status,
      errors: {
        text: { message: "" },
      },
      content: res.payload.data.content,
    };
  } else {
    return {
      ...prevState,
      status: res.status,
      errors: {
        text: { message: "Somethig Went Wrong" },
      },
    };
  }
}
