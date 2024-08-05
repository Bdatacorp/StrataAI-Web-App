import zodErrorMessageFormatter from "@/utils/server/pipes/zodErrorMessageFormatterPipe";
import ResponceStatus from "@/utils/server/config/responseStatus";
import { Chat, ChatCreateDto, ChatMessage } from "./chat.types";
import ChatValidate from "./chat.validate";
import ChatCacheTags from "./chat.tags";
import { ChatService } from "./chat.service";
import ServerToken from "@/utils/server/helper/token/serverToken";
import { HttpPostReturnType } from "@/utils/server/http/type";
import ResponseProcess from "@/utils/server/responseProcess/responseProcess";
import ZodErrorMessage from "@/utils/server/zodErrorMessage/zodErrorMessage";

class ChatController {
  private chatService: ChatService;
  private tags: string[];
  private serverToken: ServerToken;
  private responseProcess: ResponseProcess;
  private zodErrorMessage: ZodErrorMessage;
  constructor() {
    this.tags = [ChatCacheTags.CHAT];
    this.chatService = new ChatService();
    this.serverToken = new ServerToken();
    this.responseProcess = new ResponseProcess(this.tags);
    this.zodErrorMessage = new ZodErrorMessage();
  }

  async send(message: ChatCreateDto) {
    "use server";
    try {
      const validated = ChatValidate.parse(message);

      // const res = await askFromAssistant(
      //   message.text,
      //   message.token,
      //   message.state
      // );

      // if (res.status) {
      //   return {
      //     status: true,
      //     payload: res,
      //   };
      // } else {
      //   return {
      //     status: false,
      //   };
      // }
    } catch (error: any) {
      console.log(error);
      return zodErrorMessageFormatter(error);
    }
  }

  async askQuestion(message: ChatCreateDto) {
    "use server";
    try {
      const validated = ChatValidate.parse(message);

      const res = await this.chatService.create(
        validated,
        await this.serverToken.getUserToken()
      );
      const { response, payload } = res as HttpPostReturnType;


      return this.responseProcess.process({ response, payload });
    } catch (error: any) {
      return this.zodErrorMessage.format(error);
    }
  }

  async sendStream(message: ChatCreateDto) {
    "use server";

    // const validated = ChatValidate.parse(message);

    // const res = await askFromAssistantStreaming(message.text, message.token);

    // return res;
  }

  async loadMessages(token: string) {
    // "use server";
    // const res = await loadThreadMessages(token);
    // return res;
  }

  /**
   * Load Session Messages. Retreive Session Messages
   */
  async initiateSession(token: string) {
    // "use server";
    // Session.init(token, "/src/server/app/models/app.json");
    // const sessionMessages = await Session.getAssistant().loadSessionMessages();
    // return sessionMessages;
  }
}

const chatController = new ChatController();

export default chatController;
