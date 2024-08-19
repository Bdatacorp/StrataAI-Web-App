import zodErrorMessageFormatter from "@/utils/server/pipes/zodErrorMessageFormatterPipe";
import ResponceStatus from "@/utils/server/config/responseStatus";
import {
  Chat,
  CreateChatDto,
  ChatMessage,
  AskQuestionResponse,
  CreateFeedbackDto,
  CreateResponseEventDto,
} from "./chat.types";
import ChatValidate, { FeedbackValidate } from "./chat.validate";
import ChatCacheTags from "./chat.tags";
import { ChatService } from "./chat.service";
import ServerToken from "@/utils/server/helper/token/serverToken";
import { HttpMethod, HttpPostReturnType } from "@/utils/server/http/type";
import ResponseProcess from "@/utils/server/responseProcess/responseProcess";
import ZodErrorMessage from "@/utils/server/zodErrorMessage/zodErrorMessage";
import ChatRoute from "./chat.routes";
import revalidateCache from "@/utils/server/actions/revalidateCache";
import { GeneralAPIResponse } from "@/utils/server/types/app.type";

class ChatController {
  private chatService: ChatService;
  private tags: string[];
  private responseProcess: ResponseProcess;
  private zodErrorMessage: ZodErrorMessage;
  constructor() {
    this.tags = [ChatCacheTags.CHAT];
    this.chatService = new ChatService();
    this.responseProcess = new ResponseProcess(this.tags);
    this.zodErrorMessage = new ZodErrorMessage();
  }

  async askQuestion(message: CreateChatDto) {
    "use server";
    try {
      const validated = ChatValidate.parse(message);

      const sessionToken = await ServerToken.getSessionToken();

      const res = await this.chatService.createMessage(
        sessionToken,
        await ServerToken.getUserToken(),
        validated
      );
      const { response, payload } = res as HttpPostReturnType;

      return this.responseProcess.process<AskQuestionResponse>(
        { response, payload },
        { allowDefaultTags: false, tags: [sessionToken] }
      );
    } catch (error: any) {
      return this.zodErrorMessage.format(error);
    }
  }

  async createFeedback(createFeedbackDto: CreateFeedbackDto) {
    "use server";
    try {
      const validated = FeedbackValidate.parse(createFeedbackDto);

      const sessionToken = await ServerToken.getSessionToken();

      const res = await this.chatService.createFeedback(
        sessionToken,
        await ServerToken.getUserToken(),
        validated
      );
      const { response, payload } = res as HttpPostReturnType;

      return this.responseProcess.process<GeneralAPIResponse<any>>(
        { response, payload },
        { allowDefaultTags: false }
      );
    } catch (error: any) {
      return this.zodErrorMessage.format(error);
    }
  }

  async createEvent(createResponseEventDto: CreateResponseEventDto) {
    console.log(createResponseEventDto);

    ("use server");
    try {
      const sessionToken = await ServerToken.getSessionToken();

      const res = await this.chatService.createEvent(
        sessionToken,
        await ServerToken.getUserToken(),
        createResponseEventDto
      );
      const { response, payload } = res as HttpPostReturnType;

      return this.responseProcess.process<GeneralAPIResponse<any>>(
        { response, payload },
        { allowDefaultTags: false }
      );
    } catch (error: any) {
      return this.zodErrorMessage.format(error);
    }
  }

  async loadMessages() {
    "use server";
    const sessionToken = await ServerToken.getSessionTokenIf();

    if (!sessionToken) return [];

    const messages = await this.chatService.getSessionMessages(
      sessionToken,
      await ServerToken.getUserToken(),
      [sessionToken]
    );

    return messages;
  }
}

const chatController = new ChatController();

export default chatController;
