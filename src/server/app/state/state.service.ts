import Service from "@/utils/server/class/service";
import { HTTP } from "@/utils/server/http/http";
import { HttpPostReturnType } from "@/utils/server/http/type";
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
    const res = await this.Http.Upload(formData, token, URL);
    return res;
  }

  /**
   * Get Associated Files
   *  - format timestamp
   * @param stateId
   * @param token
   * @param tags
   * @returns
   */
  async getFiles(stateId: string, token: string, tags: string[]) {
    const result = await this.Http.Get(token, tags, stateId);
    const formattedFiles = await result?.files?.map((item: any) => ({
      ...item,
      createdAt: this.timeStampFormatter(item.createdAt),
      updatedAt: this.timeStampFormatter(item.updatedAt),
    }));
    return { ...result, files: formattedFiles };
  }

  /**
   * Get Associated Files
   *  - format timestamp
   * @param stateId
   * @param token
   * @param tags
   * @returns
   */
  async unassignFile(fileIds: string[], stateId: string, token: string) {
    const URL = `${process.env.BASE_API_URL}${StateRoutes.UNASSIGN_FILE}`;
    const res = await this.Http.Post({ fileIds, stateId }, token, URL);
    return res;
  }
}
