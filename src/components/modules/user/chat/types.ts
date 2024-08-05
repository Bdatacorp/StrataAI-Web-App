export type ChatFormErrors = {
  text: { message: string };
};

export type ChatFormState = {
  id:string,
  content: string;
  status: boolean;
  errors: ChatFormErrors;
};

export type ClientMessage = {
  id: string;
  text: string;
  role: string;
};

export enum MessageRoles {
  User = "user",
  Assistant = "assistant",
}
