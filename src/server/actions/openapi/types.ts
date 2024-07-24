import OpenAI from "openai";

export interface ThreadMessages {
  thread_id: string;
  user_id: string;
  session_id: string;
  assistant_id: string;
  messages: any[];
}

export interface IThread {
  id: string;
  object: string;
  created_at: number;
  metadata: {} | unknown;
  tool_resources: {} | null;
  user_id?: string;
  session_id: string;
  title: string;
  state: string;
}
