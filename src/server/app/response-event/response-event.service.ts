import Service from "@/utils/server/class/service";
import { CreateResponseEventDto, ReplyEventDto } from "./response-event.types";
import ResponseEventRoutes from "./response-event.routes";

export class ResponseEventService extends Service {
  constructor() {
    const URL = ResponseEventRoutes.RESOURCE;
    super(URL);
  }

  async getAll(token: string, tags: string[]): Promise<any> {
    const URL = `${process.env.BASE_API_URL}${ResponseEventRoutes.MANGER_EVENT}`;
    const result = await this.Http.Get(token, tags, null, URL);

    const formattedData = await result?.map((item: any) => ({
      ...item,
      createdAt: this.timeStampFormatter(item.createdAt),
      updatedAt: this.timeStampFormatter(item.updatedAt),
      reply: item.reply
        ? {
            ...item.reply,
            createdAt: this.timeStampFormatter(item.reply.createdAt),
            updatedAt: this.timeStampFormatter(item.reply.updatedAt),
          }
        : null,
    }));
    return formattedData;
  }

  async createEvent(
    sessionToken: string,
    token: string,
    createResponseEventDto: CreateResponseEventDto
  ) {
    const URL = `${process.env.BASE_API_URL}${ResponseEventRoutes.MANGER_EVENT}/${sessionToken}`;
    const res = await this.Http.Post(createResponseEventDto, token, URL);
    return res;
  }

  async replyEvent(replyEventDto: ReplyEventDto, token: string) {
    const URL = `${process.env.BASE_API_URL}${ResponseEventRoutes.MANGER_EVENT_REPLY}/${replyEventDto.requestId}`;
    const res = await this.Http.Post(
      { message: replyEventDto.message },
      token,
      URL
    );
    return res;
  }
}
