export async function POST(req: Request) {
  const { text, token } = await req.json();

  return new Response(
    new ReadableStream({
      async pull(controller) {
        // const stream = await askFromAssistantStreaming(text, token);
        const stream: any = {};
        for await (const event of stream) {
          if (event.event === "thread.message.created") {
            if (event.data.thread_id) {
              controller.enqueue(`id:${event.data.id}`);
            }
          }

          if (event.event === "thread.message.delta") {
            if (event.data.delta.content) {
              const content =
                event.data.delta.content[0].type == "text"
                  ? event.data.delta.content[0].text?.value
                  : "";
              controller.enqueue(content);
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
