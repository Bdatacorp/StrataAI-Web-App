import httpErrorPipe, { httpErrorPipeMethod } from "../pipes/httpErrorPipe";

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

  handleRequestError(error: Error) {
    console.log(error);
    throw new Error(`Failed to initiate request:`);
  }

  async Get(tags?: string[], id?: string) {
    "use server";
    try {
      const URL = id ? `${this.URL}/${id}` : this.URL;
      const method = httpErrorPipeMethod.GET;

      const response = await fetch(URL, {
        method,
        headers: this.headers,
        next: { tags },
      });

      if (response.ok) {
        const data = await response.json();

        if (data == null) {
          return {
            status: true,
            statusCode: response.status,
            data: [],
          };
        }
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

  async Post(payload: Object) {
    "use server";
    try {
      const method = httpErrorPipeMethod.POST;
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
      return await httpErrorPipe(error, httpErrorPipeMethod.POST);
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
      const method = httpErrorPipeMethod.DELETE;
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
}
