import { StateService } from "./state.service";
import StateCacheTags from "./state.tags";
import { State, StateCreateDto } from "./state.types";
import StateValidate from "./state.validate";
import ResponseProcess from "../utils/responseProcess/responseProcess";
import { HttpPostReturnType } from "../utils/http/type";
import ZodErrorMessage from "../utils/zodErrorMessage/zodErrorMessage";
import { getServerSession } from "next-auth";
import { auth } from "@/utils/helper/auth";

class StateController {
  private stateService: StateService;
  private responseProcess: ResponseProcess;
  private tags: string[];
  private zodErrorMessage: ZodErrorMessage;
  constructor() {
    this.stateService = new StateService();
    this.tags = [StateCacheTags.State];
    this.responseProcess = new ResponseProcess(this.tags);
    this.zodErrorMessage = new ZodErrorMessage();
  }

  async getAllState(): Promise<State[]> {
    "use server";

    const states = await this.stateService.getAll(
      await this.getUserToken(),
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
        await this.getUserToken()
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
        await this.getUserToken()
      );
      const { response, payload } = res as HttpPostReturnType;

      return this.responseProcess.process({ response, payload });
    } catch (error: any) {
      return this.zodErrorMessage.format(error);
    }
  }

  private async getUserToken(): Promise<string> {
    const session = await auth();
    const token = session?.user.token;

    if (!token) throw Error("Unauthozied. Couldn't found user session");
    return token;
  }

  // async deleteState(id: string) {
  //   "use server";
  //   try {
  //     if (!id) return false;

  //     const res: any = await this.stateService.delete(id);

  //     return await responseProcess(
  //       res,
  //       "State",
  //       StateCacheTags.State,
  //       "deleted"
  //     );
  //   } catch (error: any) {
  //     console.log(error);
  //     return zodErrorMessageFormatter(error);
  //   }
  // }
}

const statesController = new StateController();

export default statesController;
