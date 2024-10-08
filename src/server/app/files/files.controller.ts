import { FileService } from "./files.service";
import { File } from "./files.types";
import ResponseProcess from "@/utils/server/responseProcess/responseProcess";
import { HttpPostReturnType } from "@/utils/server/http/type";
import ZodErrorMessage from "@/utils/server/zodErrorMessage/zodErrorMessage";
import ServerToken from "@/utils/server/helper/token/serverToken";
import FilesCacheTags from "./files.tags";

class FilesController {
  private fileService: FileService;
  private responseProcess: ResponseProcess;
  private tags: string[];
  private zodErrorMessage: ZodErrorMessage;

  constructor() {
    this.fileService = new FileService();
    this.tags = [FilesCacheTags.Files];
    this.responseProcess = new ResponseProcess(this.tags);
    this.zodErrorMessage = new ZodErrorMessage();
  }

  async getAllFiles(): Promise<File[]> {
    "use server";

    const states = await this.fileService.getAll(
      await ServerToken.getUserToken(),
      this.tags
    );
    return states;
  }

  async upload(formData: FormData) {
    "use server";
    try {
      const res = await this.fileService.upload(
        formData,
        await ServerToken.getUserToken()
      );
      const { response, payload } = res as HttpPostReturnType;
      console.log(`FilesController | upload`, payload);

      return this.responseProcess.process(
        { response, payload },
        { allowDefaultTags: true }
      );
    } catch (error: any) {
      return this.zodErrorMessage.format(error);
    }
  }

  async uploadToState(formData: FormData) {
    "use server";
    try {
      const stateId = formData.get("stateId") as string;
      if (!stateId)
        return this.zodErrorMessage.format({
          status: false,
          message: "State could not be found",
        });
      const res = await this.fileService.uploadToState(
        formData,
        stateId,
        await ServerToken.getUserToken()
      );
      const { response, payload } = res as HttpPostReturnType;
      console.log(`FilesController | uploadToState`, payload);
      return this.responseProcess.process(
        { response, payload },
        {
          tags: [stateId, FilesCacheTags.Files],
          allowDefaultTags: true,
        }
      );
    } catch (error: any) {
      return this.zodErrorMessage.format(error);
    }
  }

  async deleteFile(id: string) {
    "use server";
    try {
      const res = await this.fileService.delete(
        id,
        await ServerToken.getUserToken()
      );
      const { response, payload } = res as HttpPostReturnType;

      return this.responseProcess.process(
        { response, payload },
        { allowDefaultTags: true }
      );
    } catch (error: any) {
      return this.zodErrorMessage.format(error);
    }
  }
}

const filesController = new FilesController();

export default filesController;
