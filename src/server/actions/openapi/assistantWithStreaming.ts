"use server";

import OpenAI from "openai";
import data from "./data.json";
import writeToJson from "@/utils/helper/writeToJson";
import loadThreadMessages from "./messages";
import { ASSISTANT_ID } from "./constants";
import { ThreadMessages } from "./types";

const client = new OpenAI();

export default async function askFromAssistantStreaming(
  question: string,
  token: string
) {
  let assistants: any[] = data.assistants;
  let threads: any[] = data.threds;
  let messages: ThreadMessages[] = data.messages;

  let currentThread: OpenAI.Beta.Threads.Thread;
  let currentAssistant: OpenAI.Beta.Assistant;

  currentAssistant = await client.beta.assistants.retrieve(ASSISTANT_ID);

  if (currentAssistant && !assistants[0]) {
    assistants.push(currentAssistant);
  }

  const user_messages = messages.find((message) => message.user_id === token);
  if (user_messages?.user_id) {
    console.log("User Session Found : ", user_messages.thread_id);
    currentThread = await client.beta.threads.retrieve(user_messages.thread_id);
  } else {
    console.log("User Session Not Found");
    currentThread = await client.beta.threads.create();
    threads.push({ ...currentThread, user_id: token });
    messages.push({
      user_id: token,
      assistant_id: currentAssistant.id,
      thread_id: currentThread.id,
      messages: [],
    });
  }

  const message = await client.beta.threads.messages.create(currentThread.id, {
    content: question,
    role: "user",
  });

  const run = await client.beta.threads.runs.create(currentThread.id, {
    assistant_id: currentAssistant.id,
    stream: true,
  });

  return run;
}
