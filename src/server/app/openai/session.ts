import readJsonFile from "@/utils/helper/readJson";
import { APPRepositary } from "./type";
import { Logger } from "@/utils/logger/logger";
import { Assistant } from "./assistant";
import { ASSISTANT_ID } from "@/server/actions/openapi/constants";

export class Session {
  private static readJsonFile = readJsonFile;
  private static repositary: APPRepositary;
  private static logger: Logger = new Logger("Session");
  public static assistant: Assistant = new Assistant();

  /**
   * Initiate Session
   */
  static async init(sessionID: string, repositaryPath: string) {
    await this.assistant.initiate(ASSISTANT_ID, repositaryPath);
    this.repositary = await this.assistant.readRepositary();
    await this.assistant.initiateSession(sessionID);
  }

  static getAssistant(): Assistant {
    return this.assistant;
  }
}
