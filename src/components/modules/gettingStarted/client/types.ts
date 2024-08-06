export type GettingStartedErrors = {
  [key: string]: { message: string };
};

export type GettingStartedState = {
  name: string;
  email: string;
  phone: string;
  type: string;
  stateId: string;
};

export type GettingStartedProps = {
  UserTypesData: string[];
  StatesData: { value: string; label: string }[];
};


