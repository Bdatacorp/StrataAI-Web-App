import { GeneralAPIResponse } from "@/utils/server/types/app.type";

export interface Chat {
  content: string;
  references: string[];
}

export interface ChatMessage {
  status: boolean;
  payload: { id: string; role: any; text: string }[];
}

export interface CreateChatDto {
  text: string;
}

export type MessageContent = {
  id: string;
  message: string;
};

export type MessageAnnotation = {
  type: string;
  text: string;
  end_index: number;
  start_index: number;
  file_citation: { file_id: string };
};

export type AskQuestionResponse = GeneralAPIResponse<{
  user: MessageContent;
  assistant: MessageContent & { annotations?: Array<MessageAnnotation> };
}>;

export enum FeedbackType {
  Good = "Good",
  Bad = "Bad",
}

export interface CreateFeedbackDto {
  messageId: string;
  type: FeedbackType;
}

export enum ResponseEventType {
  Reply = "Reply",
  Verify = "Verify",
  Message = "Message",
}

export type ResponseEventPayload =
  | {
      type: ResponseEventType.Reply;
      requestId: string;
      content: string;
    }
  | {
      type: ResponseEventType.Verify;
      content: string;
    }
  | {
      type: ResponseEventType.Message;
      content: string;
    };

export interface CreateResponseEventDto {
  messageId: string;
  payload: ResponseEventPayload;
}
