export interface ThreadMessages {
  thread_id: string;
  user_id: string;
  assistant_id: string;
  messages: any[];
}

export interface IThread {
  id: string;
  object: string;
  created_at: number;
  metadata: {};
  tool_resources: {};
  user_id: string;
}
