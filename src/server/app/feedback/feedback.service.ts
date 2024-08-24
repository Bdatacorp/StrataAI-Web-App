import Service from "@/utils/server/class/service";
import FeedbackRoutes from "./feedback.routes";
import { CreateFeedbackDto } from "./feedback.types";

export class FeedbackService extends Service {
  constructor() {
    const URL = FeedbackRoutes.RESOURCE;
    super(URL);
  }

  async createFeedback(
    sessionToken: string,
    token: string,
    createFeedbackDto: CreateFeedbackDto
  ) {
    const URL = `${process.env.BASE_API_URL}${FeedbackRoutes.CREATE_FEEDBACK}/${sessionToken}`;
    const res = await this.Http.Post(createFeedbackDto, token, URL);
    return res;
  }
}
