"use server";

import OpenAI from "openai";
import data from "./data.json";
import writeToJson from "./writeToJson";
import loadThreadMessages from "./messages";
import { ASSISTANT_ID } from "./constants";
import { ThreadMessages } from "./types";

const client = new OpenAI();

export default async function updateThreadMessages(
  assistantID: string,
  threadID: string,
) {
  let messages: ThreadMessages[] = data.messages;
  let currentThread: OpenAI.Beta.Threads.Thread;
  let currentAssistant: OpenAI.Beta.Assistant;

  currentAssistant = await client.beta.assistants.retrieve(assistantID);

  currentThread = await client.beta.threads.retrieve(threadID);

  if (currentThread) {
    const result: OpenAI.Beta.Threads.Messages.MessagesPage =
      await client.beta.threads.messages.list(currentThread.id);
    console.log("update message lkst result", result);

    // Update current threds messages list
    if (messages.length === 0) {
      messages.push({
        thread_id: currentThread.id,
        assistant_id: currentAssistant.id,
        user_id: "USER-1",
        messages: result.data,
      });
    } else {
      messages.map((message) => {
        console.log("Messages List : ", message);
        if (message.thread_id === currentThread.id) {
          message.messages = result.data;
          console.log("Messages Found");
        }
      });
    }

    console.log("Create Message Result : ", result.data[0].content[0]);
    await writeToJson(data, "./data.json");

    return true;
  }
}
