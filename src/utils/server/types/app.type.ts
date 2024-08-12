export type GeneralAPIResponse<T> = {
  status: boolean;
  message: string;
  data: T;
};
