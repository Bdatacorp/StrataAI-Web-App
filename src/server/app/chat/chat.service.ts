import Service from "@/utils/server/class/service";
import { HttpPostReturnType } from "@/utils/server/http/type";
import ChatRoute from "./chat.routes";
import {
  CreateChatDto,
  CreateFeedbackDto,
  CreateResponseEventDto,
} from "./chat.types";

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

  async createFeedback(
    sessionToken: string,
    token: string,
    createFeedbackDto: CreateFeedbackDto
  ) {
    const URL = `${process.env.BASE_API_URL}${ChatRoute.CREATE_FEEDBACK}/${sessionToken}`;
    const res = await this.Http.Post(createFeedbackDto, token, URL);
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
