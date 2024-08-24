import Service from "@/utils/server/class/service";
import { CreateResponseEventDto } from "./response-event.types";
import ResponseEventRoutes from "./response-event.routes";

export class ResponseEventService extends Service {
  constructor() {
    const URL = ResponseEventRoutes.RESOURCE;
    super(URL);
  }

  async createEvent(
    sessionToken: string,
    token: string,
    createResponseEventDto: CreateResponseEventDto
  ) {
    const URL = `${process.env.BASE_API_URL}${ResponseEventRoutes.CREATE_EVENT}/${sessionToken}`;
    const res = await this.Http.Post(createResponseEventDto, token, URL);
    return res;
  }
}
