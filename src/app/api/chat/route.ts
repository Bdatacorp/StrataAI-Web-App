import askFromAssistantStreaming from "@/server/actions/openapi/assistantWithStreaming";
import { AssistantResponse, OpenAIStream, StreamingTextResponse } from "ai";
import { NextResponse } from "next/server";

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
