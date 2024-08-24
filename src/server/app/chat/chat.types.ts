import { MessageRoles } from "@/components/modules/user/chat/types";
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

export type Message = {
  _id: string;
  content: { value: string; metadata: MessageMetadata[] };
  type: MessageRoles;

  createdAt: string;
  updatedAt: string;
};

export type MessageContent = {
  id: string;
  message: string;
};

export type MessageMetadata = {
  page: string;
  filename: string;
  source: string;
  pageContent?: string;
};

export type AskQuestionResponse = GeneralAPIResponse<{
  user: MessageContent;
  assistant: MessageContent & { metadata?: Array<MessageMetadata> };
}>;

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
