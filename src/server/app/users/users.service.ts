import Service from "@/utils/server/class/service";
import UserRoute from "./users.routes";

export class UsersService extends Service {
  constructor() {
    const URL = UserRoute.RESOURCE;
    super(URL);
  }
}
