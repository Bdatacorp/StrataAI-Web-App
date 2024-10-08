import Service from "@/utils/server/class/service";
import UserRoute from "./users.routes";
import { CreateAdminDto } from "./users.types";

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

  async getAllSystemUsers(token: string, tags: string[]) {
    const URL = `${process.env.BASE_API_URL}${UserRoute.SYSTEM_USERS}`;

    const result = await this.Http.Get(token, tags, null, URL);

    //format timestamp data
    const formattedData = await result?.map((item: any) => ({
      ...item,
      createdAt: this.timeStampFormatter(item.createdAt),
      latestActivity: this.timeStampFormatter(item.latestActivity),
      updatedAt: this.timeStampFormatter(item.updatedAt),
    }));
    return formattedData;
  }

  async createSystemUser(createAdminDto: CreateAdminDto, token: string) {
    const URL = `${process.env.BASE_API_URL}${UserRoute.SYSTEM_USERS}`;
    const res = await this.Http.Post(createAdminDto, token, URL);
    return res;
  }

  async deleteAdmin(id: string, token: string) {
    const URL = `${process.env.BASE_API_URL}${UserRoute.SYSTEM_USERS}`;
    const res = await this.Http.Delete(id, token, URL);
    return res;
  }

  async getAllMessages(messageToken: string, token: string, tags: string[]) {
    const URL = `${process.env.BASE_API_URL}${UserRoute.USER_MESSAGES}/${messageToken}`;
    const result = await this.Http.Get(token, tags, null, URL);
    return result;
  }

  async getAllSessions(messageToken: string, token: string, tags: string[]) {
    const URL = `${process.env.BASE_API_URL}${UserRoute.USER_SESSIONS}/${messageToken}`;
    const result = await this.Http.Get(token, tags, null, URL);
    return result;
  }

  async getActiveSession(messageToken: string, token: string, tags: string[]) {
    const URL = `${process.env.BASE_API_URL}${UserRoute.USER_ACTIVE_SESSION}/${messageToken}`;
    const result = await this.Http.Get(token, tags, null, URL);
    return result;
  }

  async createMessageToken(userId: string, token: string) {
    const URL = `${process.env.BASE_API_URL}${UserRoute.USER_MESSAGES}/${userId}`;
    const res = await this.Http.Post({}, token, URL);
    return res;
  }

  async createSessionMessageToken(
    messageToken: string,
    sessionId: string,
    token: string
  ) {
    const URL = `${process.env.BASE_API_URL}${UserRoute.USER_ACTIVE_SESSION}/${messageToken}`;
    const res = await this.Http.Post({ sessionId }, token, URL);
    return res;
  }
}
