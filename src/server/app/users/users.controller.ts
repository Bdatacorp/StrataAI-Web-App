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
  private serverToken: ServerToken;

  constructor() {
    this.usersService = new UsersService();
    this.tags = [UsersCacheTags.Users];
    this.responseProcess = new ResponseProcess(this.tags);
    this.zodErrorMessage = new ZodErrorMessage();
    this.serverToken = new ServerToken();
  }

  async getAllUsers(): Promise<File[]> {
    "use server";

    const states = await this.usersService.getAll(
      await this.serverToken.getUserToken(),
      this.tags
    );
    return states;
  }



  // async deleteFile(id: string) {
  //   "use server";
  //   try {
  //     const res = await this.usersService.delete(
  //       id,
  //       await this.serverToken.getUserToken()
  //     );
  //     const { response, payload } = res as HttpPostReturnType;

  //     return this.responseProcess.process({ response, payload });
  //   } catch (error: any) {
  //     return this.zodErrorMessage.format(error);
  //   }
  // }
}

const usersController = new UsersController();

export default usersController;
