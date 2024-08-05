import {
  AuthLoginValidate,
  AuthRegiterValidate,
  InitSessionValidate,
} from "./auth.validate";
import ServerToken from "@/utils/server/helper/token/serverToken";
import ResponseProcess from "@/utils/server/responseProcess/responseProcess";
import { HttpPostReturnType } from "@/utils/server/http/type";
import ZodErrorMessage from "@/utils/server/zodErrorMessage/zodErrorMessage";
import { AuthService } from "./auth.service";
import { CreateUserDto, InitSessionDto, LoginDto } from "./auth.types";
import { auth } from "@/utils/client/helper/auth";

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

      return this.responseProcess.process({ response, payload });
    } catch (error: any) {
      return this.zodErrorMessage.format(error);
    }
  }

  async createSession(initSessionDto: InitSessionDto) {
    "use server";
    try {
      const validated = InitSessionValidate.parse(initSessionDto);

      const userToken = await this.getUserToken();

      const res = await this.authService.initSessionByState(
        validated,
        userToken
      );

      const { response, payload } = res as HttpPostReturnType;

      return this.responseProcess.process(
        { response, payload },
        { allowDefaultTags: false, tags: [userToken] }
      );
    } catch (error: any) {
      return this.zodErrorMessage.format(error);
    }
  }

  async loadAllSessions() {
    "use server";
    const userToken = await this.getUserToken();
    const res = await this.authService.getAll(userToken, [userToken]);
    return res;
  }

  private async getUserToken(): Promise<string> {
    const session = await auth();
    const token = session?.user.token;

    if (!token) throw Error("Unauthozied. Couldn't found user");
    return token;
  }
}

const authController = new AuthController();

export default authController;
