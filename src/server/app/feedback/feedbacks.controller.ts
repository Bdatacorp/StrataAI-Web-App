import { FeedbackService } from "./feedback.service";
import StateCacheTags from "./feedback.tags";

import ResponseProcess from "@/utils/server/responseProcess/responseProcess";
import ZodErrorMessage from "@/utils/server/zodErrorMessage/zodErrorMessage";
import { auth } from "@/utils/client/helper/auth";
import { HttpPostReturnType } from "@/utils/server/http/type";
import ServerToken from "@/utils/server/helper/token/serverToken";
import { revalidatePath } from "next/cache";
import { Modules } from "@/lib/config/modules";
import FilesCacheTags from "../files/files.tags";
import FeedbackCacheTags from "./feedback.tags";
import { CreateFeedbackDto, Feedback } from "./feedback.types";
import FeedbackValidate from "./feedback.validate";
import { GeneralAPIResponse } from "@/utils/server/types/app.type";

class FeedbackController {
  private feedbackService: FeedbackService;
  private responseProcess: ResponseProcess;
  private tags: string[];
  private zodErrorMessage: ZodErrorMessage;
  constructor() {
    this.feedbackService = new FeedbackService();
    this.tags = [FeedbackCacheTags.Feedback];
    this.responseProcess = new ResponseProcess(this.tags);
    this.zodErrorMessage = new ZodErrorMessage();
  }

  async getAllFeedbacks() {
    "use server";

    const feedbacks: Feedback[] = await this.feedbackService.getAll(
      await ServerToken.getUserToken(),
      this.tags
    );

    const formattedFeedbacks = feedbacks.map((feedback: Feedback) => ({
      ...feedback,
      state: feedback.session?.state?.name,
      user: feedback.session?.user?.email,
    }));

    return formattedFeedbacks;
  }

  async createFeedback(createFeedbackDto: CreateFeedbackDto) {
    "use server";
    try {
      const validated = FeedbackValidate.parse(createFeedbackDto);

      const sessionToken = await ServerToken.getSessionToken();

      const res = await this.feedbackService.createFeedback(
        sessionToken,
        await ServerToken.getUserToken(),
        validated
      );
      const { response, payload } = res as HttpPostReturnType;

      return this.responseProcess.process<GeneralAPIResponse<any>>(
        { response, payload },
        { allowDefaultTags: false }
      );
    } catch (error: any) {
      return this.zodErrorMessage.format(error);
    }
  }
}

const feedbackController = new FeedbackController();

export default feedbackController;
