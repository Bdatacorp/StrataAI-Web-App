import Service from "@/utils/server/class/service";
import { HttpPostReturnType } from "@/utils/server/http/type";
import ChatRoute from "./chat.routes";



export class ChatService extends Service {
  constructor() {
    const URL = ChatRoute.RESOURCE;
    super(URL);
  }
}
