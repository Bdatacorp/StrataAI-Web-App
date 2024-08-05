import Service from "@/utils/server/class/service";
import { HTTP } from "@/utils/server/http/http";
import { HttpPostReturnType } from "@/utils/server/http/type";
import AuthRoutes from "./auth.routes";
import { CreateUserDto, InitSessionDto, LoginDto } from "./auth.types";

export class AuthService extends Service {
  constructor() {
    const URL = AuthRoutes.RESOURCE;
    super(URL);
  }

  /**
   * Upload Documents to State
   * @param formData FormData
   * @param stateID
   * @returns Response
   */
  async adminLlogin(loginDto: LoginDto): Promise<HttpPostReturnType | void> {
    const URL = `${process.env.BASE_API_URL}/auth/login`;
    const res = await this.Http.Post(loginDto, "", URL);
    return res;
  }

  async registerUser(createUserDto: CreateUserDto) {
    const URL = `${process.env.BASE_API_URL}${AuthRoutes.REGISTER}`;
    const res = await this.Http.Post(createUserDto, "", URL);
    return res;
  }

  async initSessionByState(initSessionDto: InitSessionDto, token: string) {
    const URL = `${process.env.BASE_API_URL}${AuthRoutes.SESSION}`;
    const res = await this.Http.Post(initSessionDto, token, URL);
    return res;
  }
}
