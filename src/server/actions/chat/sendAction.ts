"use server";

import { ChatFormState } from "@/components/modules/chat/types";
import chatController from "@/server/app/chat/chat.controller";
import { ChatCreateDto } from "@/server/app/chat/chat.types";

export default async function sendAction(
  prevState: ChatFormState,
  formData: FormData
) {
  const text = formData.get("text") as string;
  const token = formData.get("token") as string;
  const state = formData.get("state") as string;

  const message: ChatCreateDto = {
    text,
    token,
    state,
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
      id: res.payload.data.id,
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
