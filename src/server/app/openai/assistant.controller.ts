import { ASSISTANT_ID } from "@/server/actions/openapi/constants";
import OpenAI from "openai";
import {
  Thread,
  Assistant as AssistantType,
} from "openai/src/resources/beta/index.js";
import { APPRepositary, Session } from "../models/type";

class AssistantController {
  private openai: OpenAI;
  private assistant?: AssistantType;
  private thread?: Thread;
  private session?: Session;
  private repository: APPRepositary;

  constructor(dataRepository: APPRepositary) {
    this.openai = new OpenAI();
    this.repository = dataRepository;
  }

  async initializeAssistant(assistantID: string = ASSISTANT_ID) {
    this.assistant = await this.retrieveAssistant(assistantID);
  }

  private async retrieveAssistant(assistantID: string) {
    const assistant = await this.openai.beta.assistants.retrieve(assistantID);
    return assistant;
  }

  private async createMessage(question: string) {
    const message = await this.openai.beta.threads.messages.create(
      this.thread?.id || "",
      {
        content: question,
        role: "user",
      }
    );
    return message;
  }

  private async initiateSession(sessionID: string) {
    const session_messages = this.repository.messages.find(
      (message) => message.session_id === sessionID
    );

    if (session_messages?.session_id) {
      console.log("User Session Found : ", session_messages.session_id);
      this.thread = await this.openai.beta.threads.retrieve(
        session_messages.thread_id
      );
    } else {
      console.log("User Session Not Found");
      this.thread = await this.openai.beta.threads.create();
    }

    this.session = {
      ...this.thread,
      session_id: sessionID,
      assistant_id: this.assistant?.id || "",
      user_id: sessionID,
      thread_id: this.thread.id,
    };

    this.repository.sessions.push(this.session);
    this.repository.messages.push({
      ...this.session,
      messages: [],
    });
  }

  askFromAssistant(question: string) {}
}
