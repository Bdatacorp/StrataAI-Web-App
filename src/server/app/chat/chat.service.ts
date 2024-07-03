import Service from "../utils/class/service";
import ChatRoutes from "./chat.routes";
import SupplierRoutes from "./chat.routes";

export class ChatService extends Service {
  constructor() {
    const URL = ChatRoutes.CHAT;
    const TOKEN =
      process.env.CHAT_PDF_TOKEN || "sec_v8eYGgXltSpj5YgzdfatT3dgcjbXAHLP";
    super(TOKEN, URL);
  }
}

const chatServiceInstance = new ChatService();

export default chatServiceInstance;
