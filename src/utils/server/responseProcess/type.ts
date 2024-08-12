export type ResponseProcessOptions = {
  tags?: string[];
  allowDefaultTags?: boolean;
};

export type ReturnResponse<T> = {
  status: boolean;
  payload: T;
};
