import Service from "@/utils/server/class/service";

import ChatRoute from "./chat.routes";
import { CreateChatDto, CreateResponseEventDto } from "./chat.types";

export class ChatService extends Service {
  constructor() {
    const URL = ChatRoute.RESOURCE;
    super(URL);
  }

  async createMessage(
    sessionToken: string,
    token: string,
    createChatDto: CreateChatDto
  ) {
    const URL = `${process.env.BASE_API_URL}${ChatRoute.RESOURCE}/${sessionToken}`;
    const res = await this.Http.Post(createChatDto, token, URL);
    return res;
  }

  async createEvent(
    sessionToken: string,
    token: string,
    createResponseEventDto: CreateResponseEventDto
  ) {
    const URL = `${process.env.BASE_API_URL}${ChatRoute.CREATE_EVENT}/${sessionToken}`;
    const res = await this.Http.Post(createResponseEventDto, token, URL);
    console.log(res);

    return res;
  }

  async getSessionMessages(
    sessionToken: string,
    token: string,
    tags: string[]
  ) {
    const res = await this.Http.Get(token, tags, sessionToken);
    return res;
  }
}
