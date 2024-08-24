import ResponseProcess from "@/utils/server/responseProcess/responseProcess";
import ZodErrorMessage from "@/utils/server/zodErrorMessage/zodErrorMessage";
import { HttpPostReturnType } from "@/utils/server/http/type";
import ServerToken from "@/utils/server/helper/token/serverToken";
import { GeneralAPIResponse } from "@/utils/server/types/app.type";
import { ResponseEventService } from "./response-event.service";
import { CreateResponseEventDto } from "./response-event.types";
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

  async getAllFeedbacks() {
    "use server";

    const events = await this.responseEventService.getAll(
      await ServerToken.getUserToken(),
      this.tags
    );

    return events;
  }

  async createEvent(createResponseEventDto: CreateResponseEventDto) {
    console.log(createResponseEventDto);

    ("use server");
    try {
      const sessionToken = await ServerToken.getSessionToken();

      const res = await this.responseEventService.createEvent(
        sessionToken,
        await ServerToken.getUserToken(),
        createResponseEventDto
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
}

const responseEventController = new ResponseEventController();

export default responseEventController;
