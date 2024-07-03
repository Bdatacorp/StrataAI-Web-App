import zodErrorMessageFormatter from "../utils/pipes/zodErrorMessageFormatterPipe";

import ResponceStatus from "../utils/config/responseStatus";
import CacheTags from "../utils/config/cacheTags";
import responseProcess from "../utils/helper/responseProcess";
import chatServiceInstance, { ChatService } from "./chat.service";
import { Chat, ChatCreateDto } from "./chat.types";
import ChatValidate from "./chat.validate";

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

  async send(supplier: ChatCreateDto) {
    "use server";
    try {
      const validated = ChatValidate.parse(supplier);

      const data = {
        sourceId: process.env.CHAT_PDF_SOURCEID,
        messages: [
          {
            role: "user",
            content: validated.text,
          },
        ],
      };

      const res: any = await this.chatService.create(data);

      if (res.data) {
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
}

const chatController = new ChatController();

export default chatController;
