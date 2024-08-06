"use client";

import {
  ClientMessage,
  MessageRoles,
} from "@/components/modules/user/chat/types";
import Markdown from "react-markdown";

export default function ChatMessage(message: ClientMessage) {
  return (
    <div className="w-full">
      {message.role === MessageRoles.Assistant ? (
        <div className="bg-white p-5 rounded">
          <article className="prose ">
            <Markdown>{message.text}</Markdown>
          </article>
        </div>
      ) : (
        <div className="float-right bg-primary p-5 text-white rounded-3xl w-3/4 lg:w-7/12">
          <article className="prose text-white">
            <Markdown>{message.text}</Markdown>
          </article>
        </div>
      )}
    </div>
  );
}
