import Service from "../utils/class/service";
import { HttpPostReturnType } from "../utils/http/type";
import FilesRoute from "./files.routes";


export class FileService extends Service {
  constructor() {
    const URL = FilesRoute.RESOURCE;
    super(URL);
  }

  /**
   * Upload Documents to State
   * @param formData FormData
   * @param stateID
   * @returns Response
   */
  async upload(
    formData: FormData,
    token: string
  ): Promise<HttpPostReturnType | void> {
    const URL = `${process.env.BASE_API_URL}${FilesRoute.UPLOAD}`;
    const res = await this.Http.Upload(formData, token, URL);
    return res;
  }
}
