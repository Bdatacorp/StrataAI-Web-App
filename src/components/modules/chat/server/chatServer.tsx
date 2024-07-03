import { Card, ScrollArea } from "@mantine/core";
import ChatMessages from "../client/chatMessages";
import { message } from "../types";

export default function ChatServer() {
  const messages: message[] = [
    {
      text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit quis vel dolore dolor blanditiis iure repudiandae? Perferendis praesentium ipsum pariatur consectetur, nobis nihil porro atque voluptas asperiores laboriosam nostrum aut!",
      role: "assistant",
    },
    {
      text: "Something",
      role: "user",
    },
  ];

  return <ChatMessages messages={messages} />;
}
