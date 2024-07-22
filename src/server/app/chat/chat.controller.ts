import zodErrorMessageFormatter from "../utils/pipes/zodErrorMessageFormatterPipe";

import ResponceStatus from "../utils/config/responseStatus";
import CacheTags from "../utils/config/cacheTags";
import responseProcess from "../utils/helper/responseProcess";
import chatServiceInstance, { ChatService } from "./chat.service";
import { Chat, ChatCreateDto, ChatMessage } from "./chat.types";
import ChatValidate from "./chat.validate";
import askFromAssistant from "@/server/actions/openapi/assistant";
import loadThreadMessages from "@/server/actions/openapi/messages";
import askFromAssistantStreaming from "@/server/actions/openapi/assistantWithStreaming";

class ChatController {
  private chatService: ChatService;
  private responseStatus: typeof ResponceStatus;
  private tags: string[];
  constructor() {
    this.chatService = chatServiceInstance;
    this.responseStatus = ResponceStatus;
    this.tags = [CacheTags.CHAT];
  }

  async getAllChats(): Promise<Chat[]> {
    "use server";
    const res = await this.chatService.getAll(this.tags);

    return res;
  }

  async send(message: ChatCreateDto) {
    "use server";
    try {
      const validated = ChatValidate.parse(message);

      const res = await askFromAssistant(message.text, message.token);

      if (res.status) {
        return {
          status: true,
          payload: res,
        };
      } else {
        return {
          status: false,
        };
      }
    } catch (error: any) {
      console.log(error);
      return zodErrorMessageFormatter(error);
    }
  }

  async sendStream(message: ChatCreateDto) {
    "use server";

    const validated = ChatValidate.parse(message);

    const res = await askFromAssistantStreaming(message.text, message.token);

    return res;
  }

  async loadMessages(token: string): Promise<ChatMessage> {
    "use server";
    const res = await loadThreadMessages(token);

    return res;
  }
}

const chatController = new ChatController();

export default chatController;
