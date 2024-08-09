import Service from "@/utils/server/class/service";
import { InitSessionDto } from "./session.types";
import SessionRoutes from "./session.routes";

export class SessionService extends Service {
  constructor() {
    const URL = SessionRoutes.RESOURCE;
    super(URL);
  }

  async initSessionByState(initSessionDto: InitSessionDto, token: string) {
    const res = await this.Http.Post(initSessionDto, token);
    return res;
  }

  async retrieveSessionBySessionId(sessionId: string, token: string) {
    const res = await this.Http.Get(token, [sessionId], sessionId);
    return res;
  }

  async loadAllSessions(token: string, tags: string[]) {
    const res = await this.Http.Get(token, tags, null);
    return res;
  }

  async findActive(sessionToken: string, token: string) {
    const URL = `${process.env.BASE_API_URL}${SessionRoutes.FIND_SESSION_ACTIVE}/${sessionToken}`;
    const res = await this.Http.Get(token, [sessionToken], null, URL);
    return res;
  }
}
