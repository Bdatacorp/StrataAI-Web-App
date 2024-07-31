import CacheTags from "../utils/config/cacheTags";
import ResponceStatus from "../utils/config/responseStatus";
import responseProcess from "../utils/helper/responseProcess";
import zodErrorMessageFormatter from "../utils/pipes/zodErrorMessageFormatterPipe";
import { StateService } from "./state.service";
import StateCacheTags from "./state.tags";
import { State } from "./state.types";
import StateValidate from "./state.validate";

class StateController {
  private stateService: StateService;
  private responseStatus: typeof ResponceStatus;
  private tags: string[];
  constructor() {
    this.stateService = new StateService();
    this.responseStatus = ResponceStatus;
    this.tags = [StateCacheTags.State];
  }

  async getAllState(): Promise<State[]> {
    "use server";
    const states = await this.stateService.getAll(this.tags);
    return states;
  }

  async createState(State: any) {
    "use server";
    try {
      const validated = StateValidate.parse(State);

      const res: any = await this.stateService.create(validated);

      return responseProcess(res, "State", StateCacheTags.State);
    } catch (error: any) {
      console.log(error);
      return zodErrorMessageFormatter(error);
    }
  }

  async deleteState(id: string) {
    "use server";
    try {
      if (!id) return false;

      const res: any = await this.stateService.delete(id);

      return await responseProcess(res, "State", StateCacheTags.State, "deleted");
    } catch (error: any) {
      console.log(error);
      return zodErrorMessageFormatter(error);
    }
  }
}

const statesController = new StateController();

export default statesController;
