import { InitSessionValidate } from "./session.validate";
import ResponseProcess from "@/utils/server/responseProcess/responseProcess";
import { HttpPostReturnType } from "@/utils/server/http/type";
import ZodErrorMessage from "@/utils/server/zodErrorMessage/zodErrorMessage";
import { InitSessionDto } from "./session.types";
import { auth } from "@/utils/client/helper/auth";
import { SessionService } from "./session.service";
import ServerToken from "@/utils/server/helper/token/serverToken";
import revalidateCache from "@/utils/server/actions/revalidateCache";

class SessionController {
  private sessionService: SessionService;
  private responseProcess: ResponseProcess;
  private tags: string[];
  private zodErrorMessage: ZodErrorMessage;
  constructor() {
    this.sessionService = new SessionService();
    this.tags = [];
    this.responseProcess = new ResponseProcess(this.tags);
    this.zodErrorMessage = new ZodErrorMessage();
  }

  async createSession(initSessionDto: InitSessionDto) {
    "use server";
    try {
      const validated = InitSessionValidate.parse(initSessionDto);

      const userToken = await ServerToken.getUserToken();

      const res = await this.sessionService.initSessionByState(
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

  async retrieveSession(sessionId: string) {
    "use server";
    try {
      const userToken = await ServerToken.getUserToken();

      const res = await this.sessionService.retrieveSessionBySessionId(
        sessionId,
        userToken
      );

      return res;
    } catch (error: any) {
      return this.zodErrorMessage.format(error);
    }
  }

  async loadAllSessions() {
    "use server";
    const userToken = await ServerToken.getUserToken();
    const res = await this.sessionService.loadAllSessions(userToken, [
      userToken,
    ]);
    return res;
  }

  async findActiveSession() {
    "use server";
    const sessionToken = await ServerToken.getSessionToken();
    const token = await ServerToken.getUserToken();
    const res = await this.sessionService.findActive(sessionToken, token);
    return res;
  }

  async revalidateSessionMessages() {
    const sessionToken = await ServerToken.getSessionToken();
    return revalidateCache([sessionToken]);
  }

  async deleteSession(sessionId: string) {
    "use server";
    try {
      const userToken = await ServerToken.getUserToken();
      const sessionToken = await ServerToken.getSessionToken();
      const res = await this.sessionService.delete(sessionId, userToken);
      const { response, payload } = res as HttpPostReturnType;

      return this.responseProcess.process(
        { response, payload },
        { tags: [userToken, sessionToken] }
      );
    } catch (error: any) {
      return this.zodErrorMessage.format(error);
    }
  }
}

const sessionController = new SessionController();

export default sessionController;
