export type StateFormErrors = {
  name: { message: string };
};

export type StateFormState = {
  message: string;
  status: boolean;
  errors: StateFormErrors;
  formData: FormData | null;
};
