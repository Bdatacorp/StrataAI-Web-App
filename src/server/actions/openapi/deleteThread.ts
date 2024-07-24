"use server";

import OpenAI from "openai";
import data from "./data.json";
import { ASSISTANT_ID } from "./constants";
import writeToJson from "./writeToJson";
import { IThread, ThreadMessages } from "./types";

const client = new OpenAI();

export default async function deleteThread(token: string) {
  let messages: ThreadMessages[] = data.messages;

  const assistant = await client.beta.assistants.retrieve(ASSISTANT_ID);

  const user = messages.find((message) => message.user_id === token);
  console.log("Clear Session / User Found : ", token);

  const response = user
    ? await client.beta.threads.del(user.thread_id)
    : { deleted: false };

  console.log("Clear Session / Open AI Response : ", response);

  if (response.deleted) {
    const updatedMessges = data.messages.filter(
      (items: ThreadMessages) => items.session_id !== token
    );
    const updatedThreads = data.threds.filter(
      (items: IThread) => items.session_id !== token
    );
    data.messages = updatedMessges;
    data.threds = updatedThreads;
    await writeToJson(data, "../data.json");
  }

  return response.deleted;
}
