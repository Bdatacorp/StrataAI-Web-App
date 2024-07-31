import httpErrorPipe from "../pipes/httpErrorPipe";
import { HttpMethod } from "./type";

export class HTTP {
  private URL: string;
  private token: string;
  private headers: HeadersInit;

  constructor(token: string, url: string) {
    this.URL = url;
    this.token = token;

    this.headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      "x-api-key": this.token,
    };
  }

  async Get(tags?: string[], id?: string) {
    "use server";

    const URL = id ? `${this.URL}/${id}` : this.URL;
    const method = HttpMethod.GET;

    const response = await fetch(URL, {
      method,
      headers: this.headers,
      next: { tags },
    });

    return await this.hangleGetResponse(response);
  }

  async Post(payload: Object) {
    "use server";
    try {
      const method = HttpMethod.POST;
      const response = await fetch(this.URL, {
        method,
        headers: this.headers,
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        return {
          status: true,
          statusCode: response.status,
          data: data,
        };
      } else {
        return await httpErrorPipe(response, method);
      }
    } catch (error: any) {
      return await httpErrorPipe(error, HttpMethod.POST);
    }
  }

  async Put(payload: Object) {
    try {
      const response = await fetch(this.URL, {
        method: "PUT",
        headers: this.headers,
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        const data = await response.json();
        return {
          statusCode: response.status,
          data: data,
        };
      }
    } catch (error: any) {
      this.handleRequestError(error);
    }
  }

  async Delete(id: string) {
    try {
      const method = HttpMethod.DELETE;
      const response = await fetch(`${this.URL}/${id}`, {
        method,
        headers: this.headers,
      });
      if (response.ok) {
        const data = await response.json();
        return {
          status: true,
          statusCode: response.status,
          data: data,
        };
      } else {
        return await httpErrorPipe(response, method);
      }
    } catch (error: any) {
      this.handleRequestError(error);
    }
  }

  private handleRequestError(error: Error) {
    console.log("error", error);
    throw new Error(`Failed to initiate request:`);
  }

  /**
   * Try Get Response JSON and if any error throw 'Failed to initiate request'.
   * If Can parse response to json
   *  - If response is ok, return data
   *  - If response is not ok, throw error with response error code and  message
   * @param response
   * @returns response json
   */
  private async hangleGetResponse(response: Response) {
    console.log("Hangle Get Response Status : ", response.status);
    try {
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        throw new Error(
          `Unknown error occurred during the process. \nError Code : [${data.statusCode}]. \nError Message : [${data.message}]`
        );
      }
    } catch (err) {
      console.log(err);
      throw new Error(
        `Failed to initiate request: : \nError Code[${response.status}]`
      );
    }
  }
}
