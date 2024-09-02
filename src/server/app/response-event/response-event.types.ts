import { Message } from "../chat/chat.types";
import { Session } from "../session/session.types";

export enum ResponseEventType {
  Reply = "Reply",
  Replied = "Replied",
  Verify = "Verify",
  Message = "Message",
}

export interface ResponseEvent {
  _id: string;
  session: Session;
  userMessage: Message;
  assistantMessage: Message;
  type: ResponseEventType;
  content: string;
  reply?: ResponseEvent;
  createdAt: string;
  updatedAt: string;
}

export type ResponseEventAnalytics = {
  eventsCount: number;
  repliedEvents: number;
  unRepliedEvents: number;
};

export enum ResponseEventColumnEnum {
  session = "session",
  user = "user",
  state = "state",
  userMessage = "userMessage",
  assistantMessage = "assistantMessage",
  payload = "payload",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
}

export type CreateResponseEventDto = {
  messageId: string;
  type: ResponseEventType;
  content?: string;
};

export type ReplyEventDto = {
  message: string;
  verified: boolean;
  requestId: string;
};
