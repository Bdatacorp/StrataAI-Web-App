import revalidateCache from "../actions/revalidateCache";

class ResponseProcess {
  private tags: string[] = [];
  constructor(tags: string[]) {
    this.tags = tags;
  }

  /**
   * Process Response
   * @requires response : Response
   * @param response
   * @param tags If need to validate extra tags
   * @returns
   * status : boolen
   * payload : any
   */
  async process(data: { response: Response; payload: any }, tags?: string[]) {
    const { response, payload } = data;

    let formattedPayload: any;
    if (Array.isArray(payload?.message)) {
      formattedPayload = { ...payload, message: payload?.message[0] };
    } else {
      formattedPayload = payload;
    }

    if (response.ok) {
      revalidateCache(tags ? this.tags.concat(tags) : this.tags);

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
