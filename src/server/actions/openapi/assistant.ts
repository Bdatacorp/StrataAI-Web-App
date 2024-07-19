"use server";

import OpenAI from "openai";
import { TextContentBlock } from "openai/resources/beta/threads/messages.mjs";

const client = new OpenAI();

export default async function askFromAssistant(question: string) {
  //   const completion = await openai.chat.completions.create({
  //     messages: [{ role: "system", content: message }],
  //     model: "gpt-4o-mini",
  //   });

  const assistant = await client.beta.assistants.retrieve(
    "asst_cp5Ehu5en87RUriHhTP2lIN8"
  );

  const thread = await client.beta.threads.create();

  const message = await client.beta.threads.messages.create(thread.id, {
    content: question,
    role: "user",
  });

  const run = await client.beta.threads.runs.createAndPoll(thread.id, {
    assistant_id: assistant.id,
  });

  console.log("run status", run.status);

  let result;

  if (run.status == "completed") {
    result = await client.beta.threads.messages.list(thread.id);
    // console.log(result.data[0].content[0]);
  } else {
    console.log(run.status);
  }

  const content: any = result?.data[0].content[0];

  if (content) {
    return {
      status: true,
      data: {
        content: content?.text.value,
      },
    };
  } else {
    return {
      status: false,
    };
  }
}
