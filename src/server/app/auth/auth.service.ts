import Service from "../utils/class/service";
import { HTTP } from "../utils/http/http";
import { HttpPostReturnType } from "../utils/http/type";
import AuthRoutes from "./auth.routes";
import { LoginDto } from "./auth.types";

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
  async login(loginDto: LoginDto): Promise<HttpPostReturnType | void> {
    const URL = `${process.env.BASE_API_URL}/auth/login`;
    const res = await this.Http.Post(loginDto, "", URL);
    return res;
  }
}
