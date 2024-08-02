import httpErrorPipe from "../pipes/httpErrorPipe";
import { HeadersType, HttpMethod, HttpPostReturnType } from "./type";

export class HTTP {
  private BaseURL: string;

  constructor(BaseURL: string) {
    this.BaseURL = BaseURL;
  }

  async Get(token: string, tags?: string[], id?: string, BaseURL?: string) {
    "use server";

    const url = BaseURL || id ? `${this.BaseURL}/${id}` : this.BaseURL;
    const method = HttpMethod.GET;

    const response = await fetch(url, {
      method,
      headers: this.getHeaders(token),
      next: { tags },
    });

    return await this.hangleGetResponse(response);
  }

  /**
   * Post Request exentend with fetch
   * @param payload data
   * @param token Authorization Token
   * @param BaseURL custom url
   * @returns
   */
  async Post(
    payload: Object,
    token: string,
    BaseURL?: string
  ): Promise<HttpPostReturnType | void> {
    "use server";

    const url = BaseURL || this.BaseURL;

    try {
      const method = HttpMethod.POST;
      const response = await fetch(url, {
        method,
        headers: this.getHeaders(token),
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      return {
        response,
        payload: data,
      };
    } catch (error: any) {
      return this.handleRequestError(error);
    }
  }

  async Upload(
    formData: FormData,
    token: string,
    BaseURL?: string
  ): Promise<HttpPostReturnType | void> {
    "use server";

    const url = BaseURL || this.BaseURL;

    try {
      const method = HttpMethod.POST;
      const response = await fetch(url, {
        method,
        headers: this.getHeaders(token, HeadersType.FORMDATA),
        body: formData,
      });

      const data = await response.json();
      return {
        response,
        payload: data,
      };
    } catch (error: any) {
      return this.handleRequestError(error);
    }
  }

  async Put(payload: Object, token: string, BaseURL?: string) {
    const url = BaseURL || this.BaseURL;

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: this.getHeaders(token),
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

  async Delete(id: string, token: string, BaseURL?: string) {
    const url = BaseURL ? `${BaseURL}/${id}` : `${this.BaseURL}/${id}`;
    try {
      const method = HttpMethod.DELETE;
      const response = await fetch(url, {
        method,
        headers: this.getHeaders(token),
      });
      const data = await response.json();
      return {
        response,
        payload: data,
      };
    } catch (error: any) {
      this.handleRequestError(error);
    }
  }

  private handleRequestError(error: Error) {
    console.log("Handle Request Error", error);
    throw new Error(`Failed to initiate request:`);
  }

  /**
   * Return Header
   * @param token Authorization token
   * @param type Content-Type
   *  - application/json (Default)
   *  - multipart/form-data
   * @returns HeadersInit
   */
  private getHeaders(
    token: string,
    type: HeadersType = HeadersType.APPLICATION_JSON
  ): HeadersInit {
    if (type === HeadersType.APPLICATION_JSON) {
      return {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      };
    } else {
      return {
        Authorization: `Bearer ${token}`,
      };
    }
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
