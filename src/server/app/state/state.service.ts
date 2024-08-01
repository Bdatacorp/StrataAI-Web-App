import Service from "../utils/class/service";
import { HTTP } from "../utils/http/http";
import { HttpPostReturnType } from "../utils/http/type";
import StateRoutes from "./state.routes";

export class StateService extends Service {
  constructor() {
    const URL = StateRoutes.RESOURCE;
    super(URL);
  }

  /**
   * Upload Documents to State
   * @param formData FormData
   * @param stateID
   * @returns Response
   */
  async uploadToState(
    formData: FormData,
    stateID: string,
    token: string
  ): Promise<HttpPostReturnType | void> {
    const URL = `${process.env.BASE_API_URL}${StateRoutes.UPLOAD_TO_STATE}/${stateID}`;
    console.log(URL);

    const res = await this.Http.Upload(formData, token, URL);
    return res;
  }
}
