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
