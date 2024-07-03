export type ChatFormErrors = {
  text: { message: string };
};

export type ChatFormState = {
  content: string;
  status: boolean;
  errors: ChatFormErrors;
};

export type message = {
  text: string;
  role: string;
};

export enum MessageRoles {
  User = "user",
  Assistant = "assistant",
}
