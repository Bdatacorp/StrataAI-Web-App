export type ChatFormErrors = {
  text: { message: string };
};

export type ChatFormState = {
  id: string;
  content: string;
  status: boolean;
  errors: ChatFormErrors;
};

export type ClientMessage = {
  id: string;
  text: string;
  role: string;
  annotation?: Array<ClientMessageAnnotation>;
};

export type ClientMessageAnnotation = {
  file_Id: string;
  page: string | null;
};

export enum MessageRoles {
  User = "user",
  Assistant = "assistant",
}
