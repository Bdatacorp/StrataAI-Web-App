import revalidateCache from "../actions/revalidateCache";

class ResponseProcess {
  private tags: string | string[];
  constructor(tags: string | string[]) {
    this.tags = tags;
  }

  /**
   * Process Response
   * @requires response : Response
   * @param response
   * @param tags If need to validate extra tags
   * @returns
   * status : boolen
   * data : any
   */
  async process(
    data: { response: Response; payload: any },
    tags?: string | string[]
  ) {
    const { response, payload } = data;

    if (response.ok) {
      revalidateCache([this.tags, tags]);
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
