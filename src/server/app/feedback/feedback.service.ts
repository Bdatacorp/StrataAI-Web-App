import Service from "@/utils/server/class/service";
import FeedbackRoutes from "./feedback.routes";

export class FeedbackService extends Service {
  constructor() {
    const URL = FeedbackRoutes.RESOURCE;
    super(URL);
  }
}
