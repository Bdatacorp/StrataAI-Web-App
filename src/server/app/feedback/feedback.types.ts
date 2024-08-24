import {

  FeedbackType,
  Message,
  MessageContent,

} from "../chat/chat.types";
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
  userMessage = "userMessage",
  assistantMessage = "assistantMessage",
  type = "type",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
}
