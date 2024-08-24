import { Message, MessageContent } from "../chat/chat.types";
import { Session } from "../session/session.types";

export interface Feedback {
  _id: string;
  session: Session;
  userMessage: Message;
  assistantMessage: Message;
  type: FeedbackType;
  createdAt: string;
  updatedAt: string;
}

export enum FeedbackColumnEnum {
  session = "session",
  user = "user",
  state = "state",
  userMessage = "userMessage",
  assistantMessage = "assistantMessage",
  type = "type",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
}

export enum FeedbackType {
  Good = "Good",
  Bad = "Bad",
}

export interface CreateFeedbackDto {
  messageId: string;
  type: FeedbackType;
}
