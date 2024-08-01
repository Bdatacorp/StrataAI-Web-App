import StateValidate from "./auth.validate";
import ResponseProcess from "../utils/responseProcess/responseProcess";
import { HttpPostReturnType } from "../utils/http/type";
import ZodErrorMessage from "../utils/zodErrorMessage/zodErrorMessage";
import AuthLoginValidate from "./auth.validate";
import { AuthService } from "./auth.service";
import { LoginDto } from "./auth.types";

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

  async login(loginDto: LoginDto) {
    "use server";
    try {
      const validated = AuthLoginValidate.parse(loginDto);

      const res = await this.authService.login(validated);
      const { response, payload } = res as HttpPostReturnType;

      return this.responseProcess.process({ response, payload });
    } catch (error: any) {
      return this.zodErrorMessage.format(error);
    }
  }
}

const authController = new AuthController();

export default authController;
