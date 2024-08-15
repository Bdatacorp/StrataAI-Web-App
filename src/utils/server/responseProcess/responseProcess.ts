import revalidateCache from "../actions/revalidateCache";
import { ResponseProcessOptions, ReturnResponse } from "./type";

class ResponseProcess {
  private tags: string[] = [];
  constructor(tags: string[]) {
    this.tags = tags;
  }

  /**
   * Process Response
   * @requires response : Response
   * @param response
   * @param options ResponseProcessOptions
   *  - allowDefaultTags - allowing revalidate default tags (Default True)
   *  - addtitional tags
   * @returns
   * status : boolen
   * payload : any
   */
  async process<T>(
    data: { response: Response; payload: T },
    options: ResponseProcessOptions = { allowDefaultTags: true }
  ): Promise<ReturnResponse<T>> {
    const { response, payload } = data;

    let formattedPayload: any;
    if (this.hasMessageArray(payload)) {
      formattedPayload = { ...payload, message: payload?.message[0] };
    } else {
      formattedPayload = payload;
    }

    if (response.ok) {
      if (options?.allowDefaultTags) {
        options?.tags
          ? revalidateCache(this.tags.concat(options?.tags))
          : revalidateCache(this.tags);
      } else {
        options?.tags && revalidateCache(options?.tags);
      }

      return {
        status: true,
        payload: formattedPayload,
      };
    }

    return {
      status: false,
      payload: formattedPayload,
    };
  }

  private hasMessageArray(payload: any): payload is { message: any[] } {
    return payload && Array.isArray(payload.message);
  }
}

export default ResponseProcess;
