"use client";

import { message, MessageRoles } from "@/components/modules/chat/types";
import { useEffect, useState } from "react";

export default function ChatMessage(message: message) {
  const [lines, setLines] = useState<string[]>([message.text]);

  useEffect(() => {
    setLines(message.text.split("\n"));
  }, [message]);

  return (
    <div className="w-full">
      {message.role === MessageRoles.Assistant ? (
        <div className="bg-white p-5 rounded">
          {lines.map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </div>
      ) : (
        <div className="bg-primary p-5 text-white rounded w-auto">
          {lines.map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </div>
      )}
    </div>
  );
}
