"use server";

import OpenAI from "openai";
import data from "./data.json";
import writeToJson from "@/utils/helper/writeToJson";
import loadThreadMessages from "./messages";
import { ASSISTANT_ID } from "./constants";
import { ThreadMessages } from "./types";

const client = new OpenAI();

export default async function askFromAssistant(
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

  const run = await client.beta.threads.runs.createAndPoll(currentThread.id, {
    assistant_id: currentAssistant.id,
  });

  console.log(`Thread ${currentThread.id} Run status`, run.status);

  if (run.status == "completed") {
    const result: OpenAI.Beta.Threads.Messages.MessagesPage =
      await client.beta.threads.messages.list(currentThread.id);
    console.log(result);

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
    await writeToJson(data, "./src/server/actions/openapi/data.json");

    return createActionResponse(currentThread.id);
  } else {
    console.log("Run Status : ", run.status);
    console.log("Run Details : ", run);
    return {
      status: false,
    };
  }
}

function createActionResponse(thread_id: string) {
  let messages: ThreadMessages[] = data.messages;

  const latestMessage: any = messages[0].messages.find(
    (list) => list?.thread_id === thread_id
  );

  const formattedMessage = latestMessage?.content[0].text.value;

  console.log("Latest Message : ", formattedMessage);

  if (formattedMessage) {
    return {
      status: true,
      data: {
        id: latestMessage.id,
        content: formattedMessage,
      },
    };
  }

  return {
    status: false,
  };
}
