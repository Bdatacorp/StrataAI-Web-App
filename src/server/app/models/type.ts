import OpenAI from "openai";

export interface Session extends OpenAI.Beta.Threads.Thread {
  thread_id: string;
  session_id: string;
  user_id: string;
  assistant_id: string;
}

export interface ThreadMessages {
  session_id: string;
  thread_id: string;
  user_id: string;
  assistant_id: string;
  messages: OpenAI.Beta.Threads.Messages.Message[];
}

export interface APPRepositary {
  assistant: OpenAI.Beta.Assistants.Assistant;
  sessions: Session[];
  messages: ThreadMessages[];
}
