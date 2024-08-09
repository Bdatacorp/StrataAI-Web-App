import TimeStampFormatter from "../pipes/timeStampFormatterPipe";
import { HTTP } from "../http/http";
import StatusFormatter from "../pipes/statusFomatterPipe";
import { HttpPostReturnType } from "../http/type";

export default class Service {
  protected Http: HTTP;
  private timeStampFormatter: typeof TimeStampFormatter;
  private statusFormatter: typeof StatusFormatter;

  constructor(ResourceURL: string) {
    const API = process.env.BASE_API_URL;
    const BaseURL = `${API}${ResourceURL}`;
    this.Http = new HTTP(BaseURL);
    this.timeStampFormatter = TimeStampFormatter;
    this.statusFormatter = StatusFormatter;
  }

  async getAll(token: string, tags: string[]) {
    const result = await this.Http.Get(token, tags);

    //format timestamp data
    const formattedData = await result?.map((item: any) => ({
      ...item,
      createdAt: this.timeStampFormatter(item.createdAt),
      updatedAt: this.timeStampFormatter(item.updatedAt),
    }));
    return formattedData;
  }

  async findOne(id: string, token: string) {
    const result: any = await this.Http.Get(token, [], id);
    const formattedData = {
      ...result.data,
      createdAt: this.timeStampFormatter(result.data.createdAt),
      updatedAt: this.timeStampFormatter(result.data.updatedAt),
    };
    return formattedData;
  }

  async create(
    payload: Object,
    token: string
  ): Promise<HttpPostReturnType | void> {
    return await this.Http.Post(payload, token);
  }

  update(payload: Object, token: string) {
    return this.Http.Put(payload, token);
  }

  delete(id: string, token: string) {
    return this.Http.Delete(id, token);
  }
}
