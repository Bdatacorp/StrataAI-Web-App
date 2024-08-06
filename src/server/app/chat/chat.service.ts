import Service from "@/utils/server/class/service";
import { HttpPostReturnType } from "@/utils/server/http/type";
import ChatRoute from "./chat.routes";
import { CreateChatDto } from "./chat.types";

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

  async getSessionMessages(
    sessionToken: string,
    token: string,
    tags: string[]
  ) {
    const res = await this.Http.Get(token, tags, sessionToken);
    return res;
  }
}
