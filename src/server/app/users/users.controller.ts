import ResponseProcess from "@/utils/server/responseProcess/responseProcess";
import { HttpPostReturnType } from "@/utils/server/http/type";
import ZodErrorMessage from "@/utils/server/zodErrorMessage/zodErrorMessage";
import ServerToken from "@/utils/server/helper/token/serverToken";
import FilesCacheTags from "./users.tags";
import { UsersService } from "./users.service";
import UsersCacheTags from "./users.tags";
import { signIn } from "next-auth/react";

class UsersController {
  private usersService: UsersService;
  private responseProcess: ResponseProcess;
  private tags: string[];
  private zodErrorMessage: ZodErrorMessage;

  constructor() {
    this.usersService = new UsersService();
    this.tags = [UsersCacheTags.Users];
    this.responseProcess = new ResponseProcess(this.tags);
    this.zodErrorMessage = new ZodErrorMessage();
  }

  async getAllUsers(): Promise<File[]> {
    "use server";

    const users = await this.usersService.getAll(
      await ServerToken.getUserToken(),
      this.tags
    );

    return users;
  }

  async createMessageToken(userId: string) {
    "use server";

    const res = await this.usersService.createMessageToken(
      userId,
      await ServerToken.getUserToken()
    );

    const { response, payload } = res as HttpPostReturnType;

    return this.responseProcess.process(
      { response, payload },
      { tags: [], allowDefaultTags: false }
    );
  }

  async getAllUserMessages(messageToken: string) {
    "use server";

    const res = await this.usersService.getAllMessages(
      messageToken,
      await ServerToken.getUserToken(),
      []
    );

    return res;
  }

  async getAllUserSessions(messageToken: string) {
    "use server";

    const res = await this.usersService.getAllSessions(
      messageToken,
      await ServerToken.getUserToken(),
      []
    );

    return res;
  }

  async getUserActiveSession(messageToken: string) {
    "use server";

    const res = await this.usersService.getActiveSession(
      messageToken,
      await ServerToken.getUserToken(),
      []
    );

    return res;
  }

  async createSessionMessageToken(messageToken: string, sessionId: string) {
    "use server";

    const res = await this.usersService.createSessionMessageToken(
      messageToken,
      sessionId,
      await ServerToken.getUserToken()
    );

    const { response, payload } = res as HttpPostReturnType;

    return this.responseProcess.process(
      { response, payload },
      { tags: [], allowDefaultTags: false }
    );
  }
}

const usersController = new UsersController();

export default usersController;
