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
