import {
  ClientMessage,
  MessageRoles,
} from "@/components/modules/user/chat/types";

export const initialSessionMessages: ClientMessage[] = [
  {
    id: "0",
    role: MessageRoles.Assistant,
    text: "Hello, I am Strata Chat AI. How can I assist you today?",
  },
];
