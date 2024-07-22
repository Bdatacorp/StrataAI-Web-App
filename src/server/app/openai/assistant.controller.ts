import { ASSISTANT_ID } from "@/server/actions/openapi/constants";
import OpenAI from "openai";
import {
  Thread,
  Assistant as AssistantType,
} from "openai/src/resources/beta/index.js";
import { APPRepositary, Session, ThreadMessage } from "./type";
import { Logger } from "@/utils/logger/logger";
import writeToJson from "@/utils/helper/writeToJson";
import readJsonFile from "@/utils/helper/readJson";

class AssistantController {
  private openai: OpenAI;
  private assistant?: AssistantType | null;
  private thread?: Thread;
  private session?: Session;
  private repository: APPRepositary;
  private logger: Logger;
  private writeToJson: typeof writeToJson;
  private readJson: typeof readJsonFile;

  constructor() {
    this.openai = new OpenAI();
    this.repository = { assistant: [], messages: [], sessions: [] };
    this.logger = new Logger("Assistant Controller");
    this.writeToJson = writeToJson;
    this.readJson = readJsonFile;
  }

  async initiate(assistantID: string = ASSISTANT_ID, respositaryPath: string) {
    this.assistant = await this.retrieveAssistant(assistantID);
    this.repository = await this.initiateRepositary(respositaryPath);
    this.logger.setInitiatedLog("Assistant");
  }

  private async retrieveAssistant(assistantID: string) {
    const assistant = await this.openai.beta.assistants.retrieve(assistantID);
    this.logger.setCustomProcessLog("Assistant", "Retrieved");
    return assistant;
  }

  private async initiateRepositary(
    respositaryPath: string
  ): Promise<APPRepositary> {
    const repositary: APPRepositary = await this.readJson(respositaryPath);
    this.logger.setInitiatedLog("Reposiraty");
    return { ...repositary, metaData: { path: respositaryPath } };
  }

  private async createMessage(question: string) {
    const message = await this.openai.beta.threads.messages.create(
      this.thread?.id || "",
      {
        content: question,
        role: "user",
      }
    );

    this.logger.setCustomProcessLog("Messages", "Created", question);
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

    this.logger.setInitiatedLog("Thread", this.thread.id);
    this.logger.setInitiatedLog("Session", this.thread.id);
  }

  private updateThreadMessageList(
    messagesPage: OpenAI.Beta.Threads.Messages.MessagesPage
  ) {
    if (this.repository.messages.length === 0) {
      this.repository.messages.push({
        session_id: this.session?.id || "",
        thread_id: this.thread?.id || "",
        assistant_id: this.assistant?.id || "",
        user_id: this.session?.id || "",
        messages: messagesPage.data,
      });
      this.logger.setCustomProcessLog("New Thread Messages", "Created");
    } else {
      this.repository.messages.map((message) => {
        console.log("Messages List : ", message);
        if (message.thread_id === this.thread?.id) {
          message.messages = messagesPage.data;
          console.log("Messages Found");
        }
      });
      this.logger.setCustomProcessLog(
        "Thread Messages List",
        "Updated",
        this.thread?.id
      );
    }
  }

  private async saveRespositary() {
    await this.writeToJson(
      this.repository,
      this.repository.metaData?.path || ""
    );
    this.logger.setCustomProcessLog("Repositary", "Saved");
  }

  private getLatestMessageFromThread(threadID: string) {
    const threadMessagesList = this.repository.messages.find(
      (item) => item.thread_id === this.thread?.id
    )?.messages;

    if (!threadMessagesList) {
      this.logger.setErrorLog("Thread Messages List Not Found");
      return { status: false };
    }

    const latestThreadMessage =
      threadMessagesList[0].content[0].type === "text" &&
      threadMessagesList[0].content[0].text.value;

    if (latestThreadMessage) {
      this.logger.setCustomProcessLog(
        "Latest thread message",
        "retreived",
        latestThreadMessage
      );
      return {
        status: true,
        data: {
          id: threadMessagesList[0].id,
          content: latestThreadMessage,
        },
      };
    }

    this.logger.setErrorLog(
      "Error Occered When Retreive Latest Thread Message"
    );

    return {
      status: false,
    };
  }

  async askFromAssistant(question: string) {
    await this.createMessage(question);

    const run = await this.openai.beta.threads.runs.createAndPoll(
      this.thread?.id || "",
      {
        assistant_id: "" + this.assistant?.id,
      }
    );

    this.logger.setCustomProcessLog("Thread", "Run Status", this.assistant?.id);

    if (run.status == "completed") {
      const messagesList: OpenAI.Beta.Threads.Messages.MessagesPage =
        await this.openai.beta.threads.messages.list(this.thread?.id || "");

      // Update current threds messages list
      this.updateThreadMessageList(messagesList);

      //save repositary
      this.saveRespositary();

      //get latest thread message
      const latestThreadMessage = this.getLatestMessageFromThread(
        this.thread?.id || ""
      );

      return latestThreadMessage;
    } else {
      this.logger.setErrorLog("Ask From Assistant Run Status", run.status);
      return {
        status: false,
      };
    }
  }

  async askFromAssistantSync(question: string) {
    await this.createMessage(question);

    const run = await this.openai.beta.threads.runs.create(
      this.thread?.id || "",
      {
        assistant_id: this.assistant?.id || "",
        stream: true,
      }
    );

    this.logger.setCustomProcessLog(
      "Run Streaming",
      "Running",
      this.thread?.id
    );

    return run;
  }
}
