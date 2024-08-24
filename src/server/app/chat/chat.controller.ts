import { CreateChatDto, AskQuestionResponse } from "./chat.types";
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
