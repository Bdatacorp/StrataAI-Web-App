import zodErrorMessageFormatter from "../utils/pipes/zodErrorMessageFormatterPipe";

import ResponceStatus from "../utils/config/responseStatus";
import CacheTags from "../utils/config/cacheTags";
import responseProcess from "../utils/responseProcess/responseProcess";
import { Chat, ChatCreateDto, ChatMessage } from "./chat.types";
import ChatValidate from "./chat.validate";
import askFromAssistant from "@/server/actions/openapi/assistant";
import loadThreadMessages from "@/server/actions/openapi/messages";
import askFromAssistantStreaming from "@/server/actions/openapi/assistantWithStreaming";
import { Session } from "../openai/session";

class ChatController {
  private responseStatus: typeof ResponceStatus;
  private tags: string[];
  constructor() {
    this.responseStatus = ResponceStatus;
    this.tags = [CacheTags.CHAT];
  }

  async send(message: ChatCreateDto) {
    "use server";
    try {
      const validated = ChatValidate.parse(message);

      const res = await askFromAssistant(
        message.text,
        message.token,
        message.state
      );

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

  /**
   * Load Session Messages. Retreive Session Messages
   */
  async initiateSession(token: string) {
    "use server";
    Session.init(token, "/src/server/app/models/app.json");
    const sessionMessages = await Session.getAssistant().loadSessionMessages();
    return sessionMessages;
  }
}

const chatController = new ChatController();

export default chatController;
