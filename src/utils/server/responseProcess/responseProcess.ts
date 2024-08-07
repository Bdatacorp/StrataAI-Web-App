import revalidateCache from "../actions/revalidateCache";
import { ResponseProcessOptions } from "./type";

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
  async process(
    data: { response: Response; payload: any },
    options: ResponseProcessOptions = { allowDefaultTags: true }
  ) {
    const { response, payload } = data;

    let formattedPayload: any;
    if (Array.isArray(payload?.message)) {
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
}

export default ResponseProcess;
