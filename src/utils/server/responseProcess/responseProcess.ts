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

    if (response.ok) {
      revalidateCache(tags ? this.tags.concat(tags) : this.tags);
      return {
        status: true,
        payload,
      };
    }

    return {
      status: false,
      payload,
    };
  }
}

export default ResponseProcess;
