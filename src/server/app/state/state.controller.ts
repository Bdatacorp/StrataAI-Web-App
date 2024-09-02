import { StateService } from "./state.service";
import StateCacheTags from "./state.tags";
import { State, StateCreateDto } from "./state.types";
import { StateValidate, UnAssignFileValidate } from "./state.validate";
import ResponseProcess from "@/utils/server/responseProcess/responseProcess";
import ZodErrorMessage from "@/utils/server/zodErrorMessage/zodErrorMessage";
import { auth } from "@/utils/client/helper/auth";
import { HttpPostReturnType } from "@/utils/server/http/type";
import ServerToken from "@/utils/server/helper/token/serverToken";
import { revalidatePath } from "next/cache";
import { Modules } from "@/lib/config/modules";
import FilesCacheTags from "../files/files.tags";
import revalidateCache from "@/utils/server/actions/revalidateCache";

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

    const states = await this.stateService.getAll("", this.tags);
    return states;
  }

  async getAssociatedFiles(stateId: string): Promise<State[]> {
    "use server";

    const states = await this.stateService.getFiles(
      stateId,
      await ServerToken.getUserToken(),
      [stateId]
    );
    return states;
  }

  async createState(state: StateCreateDto) {
    "use server";
    try {
      const validated = StateValidate.parse(state);

      const res = await this.stateService.create(
        validated,
        await ServerToken.getUserToken()
      );
      const { response, payload } = res as HttpPostReturnType;

      return this.responseProcess.process(
        { response, payload },
        { allowDefaultTags: false }
      );
    } catch (error: any) {
      return this.zodErrorMessage.format(error);
    }
  }

  async revalidateState(stateId: string) {
    "use server";
    return revalidateCache([
      stateId,
      FilesCacheTags.Files,
      StateCacheTags.State,
    ]);
  }

  async deleteState(id: string) {
    "use server";
    try {
      const res = await this.stateService.delete(
        id,
        await ServerToken.getUserToken()
      );
      const { response, payload } = res as HttpPostReturnType;

      return this.responseProcess.process(
        { response, payload },
        { tags: [id], allowDefaultTags: true }
      );
    } catch (error: any) {
      return this.zodErrorMessage.format(error);
    }
  }

  async unAssignFiles(fileIds: string[], stateId: string) {
    "use server";
    try {
      const validated = UnAssignFileValidate.parse({ fileIds, stateId });

      const res = await this.stateService.unassignFile(
        validated.fileIds,
        validated.stateId,
        await ServerToken.getUserToken()
      );
      const { response, payload } = res as HttpPostReturnType;

      return this.responseProcess.process(
        { response, payload },
        { tags: [stateId] }
      );
    } catch (error: any) {
      return this.zodErrorMessage.format(error);
    }
  }
}

const statesController = new StateController();

export default statesController;
