import ResponseProcess from "@/utils/server/responseProcess/responseProcess";
import ZodErrorMessage from "@/utils/server/zodErrorMessage/zodErrorMessage";
import { HttpPostReturnType } from "@/utils/server/http/type";
import ServerToken from "@/utils/server/helper/token/serverToken";
import { GeneralAPIResponse } from "@/utils/server/types/app.type";
import { ResponseEventService } from "./response-event.service";
import {
  CreateResponseEventDto,
  ReplyEventDto,
  ResponseEvent,
  ResponseEventAnalytics,
} from "./response-event.types";
import ResponseEventTags from "./response-event.tags";

class ResponseEventController {
  private responseEventService: ResponseEventService;
  private responseProcess: ResponseProcess;
  private tags: string[];
  private zodErrorMessage: ZodErrorMessage;
  constructor() {
    this.responseEventService = new ResponseEventService();
    this.tags = [ResponseEventTags.ResponseEventManager];
    this.responseProcess = new ResponseProcess(this.tags);
    this.zodErrorMessage = new ZodErrorMessage();
  }

  async getAllEvents() {
    "use server";

    const events: ResponseEvent[] = await this.responseEventService.getAll(
      await ServerToken.getUserToken(),
      this.tags
    );

    const formattedEvents = events.map((responseEvent: ResponseEvent) => ({
      ...responseEvent,
      state: responseEvent.session?.state?.name,
      user: responseEvent.session?.user?.email,
    }));

    return formattedEvents;
  }

  async createEvent(createResponseEventDto: CreateResponseEventDto) {
    "use server";
    try {
      const sessionToken = await ServerToken.getSessionToken();

      const res = await this.responseEventService.createEvent(
        sessionToken,
        await ServerToken.getUserToken(),
        createResponseEventDto
      );

      console.log(res);

      const { response, payload } = res as HttpPostReturnType;

      return this.responseProcess.process<GeneralAPIResponse<any>>(
        { response, payload },
        { allowDefaultTags: true }
      );
    } catch (error: any) {
      return this.zodErrorMessage.format(error);
    }
  }

  async replyToResponseEventAction(replyEventDto: ReplyEventDto) {
    "use server";
    try {
      if (!replyEventDto.requestId)
        return this.zodErrorMessage.format({
          status: false,
          message: "Request ID could not be found",
        });

      if (replyEventDto.verified == true) {
        replyEventDto.message = `Your response has been verified by the manager. ${
          replyEventDto.message && "\nComment : \n" + replyEventDto.message
        }`;
      } else {
        if (!replyEventDto.message)
          return this.zodErrorMessage.format({
            status: false,
            message: "Please verify the response or type a comment",
          });
      }

      const res = await this.responseEventService.replyEvent(
        replyEventDto,
        await ServerToken.getUserToken()
      );
      const { response, payload } = res as HttpPostReturnType;

      return this.responseProcess.process<GeneralAPIResponse<any>>(
        { response, payload },
        { allowDefaultTags: true }
      );
    } catch (error: any) {
      return this.zodErrorMessage.format(error);
    }
  }

  async getAnalytics() {
    "use server";

    const analytics: ResponseEventAnalytics =
      await this.responseEventService.analytics(
        await ServerToken.getUserToken(),
        this.tags
      );

    return analytics;
  }
}

const responseEventController = new ResponseEventController();

export default responseEventController;
