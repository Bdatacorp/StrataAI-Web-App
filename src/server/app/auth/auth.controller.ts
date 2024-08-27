import { AuthLoginValidate, AuthRegiterValidate, AuthUserValidate } from "./auth.validate";
import ServerToken from "@/utils/server/helper/token/serverToken";
import ResponseProcess from "@/utils/server/responseProcess/responseProcess";
import { HttpPostReturnType } from "@/utils/server/http/type";
import ZodErrorMessage from "@/utils/server/zodErrorMessage/zodErrorMessage";
import { AuthService } from "./auth.service";
import { CreateUserDto, LoginDto } from "./auth.types";
import { auth } from "@/utils/client/helper/auth";
import UsersCacheTags from "../users/users.tags";

class AuthController {
  private authService: AuthService;
  private responseProcess: ResponseProcess;
  private tags: string[];
  private zodErrorMessage: ZodErrorMessage;
  constructor() {
    this.authService = new AuthService();
    this.tags = [];
    this.responseProcess = new ResponseProcess(this.tags);
    this.zodErrorMessage = new ZodErrorMessage();
  }

  async adminLogin(loginDto: LoginDto) {
    "use server";
    try {
      const validated = AuthLoginValidate.parse(loginDto);

      const res = await this.authService.adminLlogin(validated);
      const { response, payload } = res as HttpPostReturnType;

      return this.responseProcess.process({ response, payload });
    } catch (error: any) {
      return this.zodErrorMessage.format(error);
    }
  }

  async registerUser(createUserDto: CreateUserDto) {
    "use server";
    try {
      const validated = AuthRegiterValidate.parse(createUserDto);

      const res = await this.authService.registerUser(validated);

      const { response, payload } = res as HttpPostReturnType;

      return this.responseProcess.process({ response, payload },{
        allowDefaultTags:false,
        tags:[UsersCacheTags.Users]
      });
    } catch (error: any) {
      return this.zodErrorMessage.format(error);
    }
  }

  async validateUser(email: string) {
    "use server";
    try {
      const validated = AuthUserValidate.parse(email);

      const res = await this.authService.validateUser(validated);

      const { response, payload } = res as HttpPostReturnType;

      return this.responseProcess.process({ response, payload },{
        allowDefaultTags:false,
        tags:[UsersCacheTags.Users]
      });
    } catch (error: any) {
      return this.zodErrorMessage.format(error);
    }
  }
}

const authController = new AuthController();

export default authController;
