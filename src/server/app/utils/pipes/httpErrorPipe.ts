export enum httpErrorPipeMethod {
  POST = "POST",
  GET = "GET",
  PUT = "PUT",
  DELETE = "DELETE",
}

export default async function httpErrorPipe(
  response: Response,
  method: httpErrorPipeMethod
) {
  "use server";

  if (response.status === 500) {
    const res = await response.json();
console.log(res);
    if (method !== httpErrorPipeMethod.GET) {
      if (res.error) {
        return {
          status: false,
          error: {
            status: res.error.status,
            message: res.error.message,
          },
        };
      } else {
        return {
          status: false,
          message: response.statusText,
        };
      }
    }

    throw new Error(response.statusText);
  } else if (response.status === 400 || response.status === 401) {
    const res = await response.json();
    if (!res?.error?.message)
      return {
        status: false,
        message: "Unknown Bad Requrest error occurred during the process",
      };
    return {
      status: false,
      message: res.error.message,
    };
  }

  return {
    status: false,
    message:
      "Unknown error occurred during the process. Error Code : [Failed to initiate request:]",
  };
}
