export enum HttpMethod {
  POST = "POST",
  GET = "GET",
  PUT = "PUT",
  DELETE = "DELETE",
}

export type HttpPostReturnType = {
  response: Response;
  payload: any;
};

export enum HeadersType {
  FORMDATA = "FORMDATA",
  APPLICATION_JSON = " APPLICATION_JSON",
}
