"use server";

import OpenAI from "openai";
import data from "./data.json";
import writeToJson from "@/utils/helper/writeToJson";

const client = new OpenAI();

interface ThreadMesseges {
  thread_id: string;
  user_id: string;
  assistant_id: string;
  messeges: any[];
}

export default async function askFromAssistant(question: string) {
  let assistants: any[] = data.assistants;
  let threads: any[] = data.threds;
  let messages: ThreadMesseges[] = data.messages;

  let currentThread: OpenAI.Beta.Threads.Thread;
  let currentAssistant: OpenAI.Beta.Assistant;

  currentAssistant = await client.beta.assistants.retrieve(
    "asst_cp5Ehu5en87RUriHhTP2lIN8"
  );

  if (currentAssistant && !assistants[0]) {
    assistants.push(currentAssistant);
  }

  if (threads[0]) {
    console.log("Thread Found : ", threads[0].id);
    currentThread = await client.beta.threads.retrieve(threads[0].id);
  } else {
    console.log("Thread Not Found");
    currentThread = await client.beta.threads.create();
    threads.push(currentThread);
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
        messeges: result.data,
      });
    } else {
      messages.map((message) => {
        console.log("Messages List : ", message);
        if (message.thread_id === currentThread.id) {
          message.messeges = result.data;
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
  let messages: ThreadMesseges[] = data.messages;

  const latestMessage: any = messages[0].messeges.find(
    (list) => list?.thread_id === thread_id
  );

  const formattedMessage =
    latestMessage?.content[0].type === "text" &&
    latestMessage?.content[0].text.value;

  console.log("Latest Message : ", formattedMessage);

  if (formattedMessage) {
    return {
      status: true,
      data: {
        content: formattedMessage,
      },
    };
  }

  return {
    status: false,
  };
}
