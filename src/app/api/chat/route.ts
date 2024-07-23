import askFromAssistantStreaming from "@/server/actions/openapi/assistantWithStreaming";
import updateThreadMessages from "@/server/actions/openapi/updateThreadMessages";
import { AssistantResponse, OpenAIStream, StreamingTextResponse } from "ai";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: Request) {
  const { text, token } = await req.json();

  return new Response(
    new ReadableStream({
      async pull(controller) {
        const stream = await askFromAssistantStreaming(text, token);

        for await (const event of stream) {
          if (event.event === "thread.message.created") {
            if (event.data.thread_id) {
              controller.enqueue(`thread:${event.data.thread_id}`);
            }
          }

          if (event.event === "thread.message.delta") {
            if (event.data.delta.content) {
              const content = event.data.delta.content[0];
              controller.enqueue(content.type == "text" && content.text?.value);
            }
          }

          if (event.event === "thread.message.completed") {
            if (event.data) {
              await updateThreadMessages(
                event.data.assistant_id || "",
                event.data.thread_id
              );
            }
          }
        }

        controller.close();
      },
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "text/event-stream",
      },
    }
  );
}
