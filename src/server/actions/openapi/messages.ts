"use server";

import data from "./data.json";

import { ChatMessage } from "@/server/app/chat/chat.types";
import { ThreadMessages } from "./types";

export default async function loadThreadMessages(
  token: string
) {
  let messages: ThreadMessages[] = data.messages;

  const user = messages.find((message) => message.user_id === token);
  if (user?.user_id) {
    console.log("Load Messages / User Session Found : ", user.thread_id);

    const messages = user.messages.map((item) => {
      return {
        id: item.id,
        role: item.role,
        text: item.content[0].text.value,
      };
    });

    //Format messeses by reverse order
    const formattedMessages = messages.reverse();

    return {
      status: true,
      payload: formattedMessages,
    };
  } else {
    return {
      status: false,
      payload: [],
    };
  }
}
