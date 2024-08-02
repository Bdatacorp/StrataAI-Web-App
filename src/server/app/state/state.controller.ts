import { StateService } from "./state.service";
import StateCacheTags from "./state.tags";
import { State, StateCreateDto } from "./state.types";
import StateValidate from "./state.validate";
import ResponseProcess from "@/utils/server/responseProcess/responseProcess";
import ZodErrorMessage from "@/utils/server/zodErrorMessage/zodErrorMessage";
import { auth } from "@/utils/client/helper/auth";
import { HttpPostReturnType } from "@/utils/server/http/type";
import ServerToken from "@/utils/server/helper/token/serverToken";

class StateController {
  private stateService: StateService;
  private responseProcess: ResponseProcess;
  private tags: string[];
  private zodErrorMessage: ZodErrorMessage;
  private serverToken : ServerToken;
  constructor() {
    this.stateService = new StateService();
    this.tags = [StateCacheTags.State];
    this.responseProcess = new ResponseProcess(this.tags);
    this.serverToken = new ServerToken();
    this.zodErrorMessage = new ZodErrorMessage();
  }

  async getAllState(): Promise<State[]> {
    "use server";

    const states = await this.stateService.getAll(
      await this.serverToken.getUserToken(),
      this.tags
    );
    return states;
  }

  async createState(state: StateCreateDto) {
    "use server";
    try {
      const validated = StateValidate.parse(state);

      const res = await this.stateService.create(
        validated,
        await this.serverToken.getUserToken()
      );
      const { response, payload } = res as HttpPostReturnType;

      return this.responseProcess.process({ response, payload });
    } catch (error: any) {
      return this.zodErrorMessage.format(error);
    }
  }

  async uploadToState(formData: FormData) {
    "use server";
    try {
      const res = await this.stateService.uploadToState(
        formData,
        formData.get("stateId") as string,
        await this.serverToken.getUserToken()
      );
      const { response, payload } = res as HttpPostReturnType;

      return this.responseProcess.process({ response, payload });
    } catch (error: any) {
      return this.zodErrorMessage.format(error);
    }
  }

  async deleteState(id: string) {
    "use server";
    try {
      const res = await this.stateService.delete(id, await this.serverToken.getUserToken());
      const { response, payload } = res as HttpPostReturnType;

      return this.responseProcess.process({ response, payload });
    } catch (error: any) {
      return this.zodErrorMessage.format(error);
    }
  }


}

const statesController = new StateController();

export default statesController;
