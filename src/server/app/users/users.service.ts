import Service from "@/utils/server/class/service";
import UserRoute from "./users.routes";

export class UsersService extends Service {
  constructor() {
    const URL = UserRoute.RESOURCE;
    super(URL);
  }

  async getAll(token: string, tags: string[]) {
    const result = await this.Http.Get(token, tags);

    //format timestamp data
    const formattedData = await result?.map((item: any) => ({
      ...item,
      createdAt: this.timeStampFormatter(item.createdAt),
      latestActivity: this.timeStampFormatter(item.latestActivity),
      updatedAt: this.timeStampFormatter(item.updatedAt),
    }));
    return formattedData;
  }
}
