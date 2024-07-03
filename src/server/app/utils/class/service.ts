import TimeStampFormatter from "../pipes/timeStampFormatterPipe";
import { HTTP } from "../http/http";
import StatusFormatter from "../pipes/statusFomatterPipe";
import { APIRoute } from "../config/app";

export default class Service {
  private Http: HTTP;
  private timeStampFormatter: typeof TimeStampFormatter;
  private statusFormatter: typeof StatusFormatter;

  constructor(token: string, url: string) {
    const API = process.env.SSIAE_API || APIRoute;

    const URL = `${API}${url}`;
    this.Http = new HTTP(token, URL);
    this.timeStampFormatter = TimeStampFormatter;
    this.statusFormatter = StatusFormatter;
  }

  async getAll(tags: string[]) {
    const result: any = await this.Http.Get(tags);
    //format timestamp data
    const formattedData = result?.data?.map((item: any) => ({
      ...item,
      status: this.statusFormatter(item.status),
      createdAt: this.timeStampFormatter(item.createdAt),
      updatedAt: this.timeStampFormatter(item.updatedAt),
    }));
    return formattedData;
  }

  async findOne(id: string) {
    const result: any = await this.Http.Get([], id);
    const formattedData = {
      ...result.data,
      createdAt: this.timeStampFormatter(result.data.createdAt),
      updatedAt: this.timeStampFormatter(result.data.updatedAt),
    };
    return formattedData;
  }

  create(payload: Object) {
    return this.Http.Post(payload);
  }

  update(payload: Object) {
    return this.Http.Put(payload);
  }

  delete(id: string) {
    return this.Http.Delete(id);
  }
}
