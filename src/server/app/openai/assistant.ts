import { ASSISTANT_ID } from "@/server/actions/openapi/constants";
import OpenAI from "openai";
import { APPRepositary, Session, ThreadMessage } from "./type";
import { Logger } from "@/utils/logger/logger";
import writeToJson from "@/server/actions/openapi/writeToJson";
import readJsonFile from "@/utils/helper/readJson";

/**
 * Assistant Class Help to Initiate Assisant, Initiate Session, Initiate Thread and Create
 * Message with Streaming or without Streaming
 */
export class Assistant {
  private openai: OpenAI;
  private assistant?: OpenAI.Beta.Assistants.Assistant | null;
  private thread?: OpenAI.Beta.Threads.Thread;
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

  /**
   * Initiate async Assistant Class Dependancy. (OpenAi Assistant and Repositary)
   */
  async initiate(assistantID: string = ASSISTANT_ID, respositaryPath: string) {
    this.assistant = await this.retrieveAssistant(assistantID);
    this.repository = await this.initiateRepositary(respositaryPath);
    this.logger.setInitiatedLog("Assistant");
  }

  /**
   * Read Repositary From public
   */
  async readRepositary(): Promise<APPRepositary> {
    return this.repository;
  }

  /**
   * Retrieve Assistant from OpenAI Assistant v2 by assistantID
   */
  private async retrieveAssistant(assistantID: string) {
    const assistant = await this.openai.beta.assistants.retrieve(assistantID);
    this.logger.setCustomProcessLog("Assistant", "Retrieved");
    return assistant;
  }

  /**
   * Initiate Repositary by respositary file path (JSON)
   */
  private async initiateRepositary(
    respositaryPath: string
  ): Promise<APPRepositary> {
    const repositary: APPRepositary = await this.readJson(respositaryPath);
    this.logger.setInitiatedLog("Reposiraty");
    return { ...repositary, metaData: { path: respositaryPath } };
  }

  /**
   * Initiate Session (With Thread) by retreiving extisting Thread or Init New Thread
   */
  async initiateSession(sessionID: string) {
    const session_messages = this.repository.messages.find(
      (message) => message.session_id === sessionID
    );

    if (session_messages?.session_id) {
      this.logger.setCustomProcessLog(
        "Session",
        "Found",
        session_messages.session_id
      );
      this.thread = await this.openai.beta.threads.retrieve(
        session_messages.thread_id
      );
    } else {
      this.thread = await this.openai.beta.threads.create();
      this.logger.setCustomProcessLog("New Session", "Created", this.thread.id);
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

  /**
   * Load Session Messages
   */
  async loadSessionMessages() {
    const session = this.repository.messages.find(
      (message) => message.session_id === this.session?.id
    );

    if (session) {
      this.logger.setCustomProcessLog(
        "Session",
        "Found",
        session.session_id,
        "LoadSessionMessage"
      );

      const messages = session.messages.map((item) => {
        return {
          id: item.id,
          role: item.role,
          text:
            item.content[0].type === "text" ? item.content[0].text.value : "",
        };
      });

      //Format messeses by reverse order
      const formattedMessages = messages.reverse();

      return {
        status: true,
        payload: formattedMessages,
      };
    } else {
      return {
        status: false,
        payload: [],
      };
    }
  }

  /**
   * Create New Message in thread
   */
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

  /**
   * Save Messages List to Chat History by update Thread Messages List
   */
  private async updateThreadMessageList(threadID: string) {
    const messagesList: OpenAI.Beta.Threads.Messages.MessagesPage =
      await this.openai.beta.threads.messages.list(threadID);

    if (this.repository.messages.length === 0) {
      this.repository.messages.push({
        session_id: this.session?.id || "",
        thread_id: this.thread?.id || "",
        assistant_id: this.assistant?.id || "",
        user_id: this.session?.id || "",
        messages: messagesList.data,
      });
      this.logger.setCustomProcessLog("New Thread Messages", "Created");
    } else {
      this.repository.messages.map((message) => {
        console.log("Messages List : ", message);
        if (message.thread_id === this.thread?.id) {
          message.messages = messagesList.data;
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

  /**
   * Save Respositary to file. (JSON)
   */
  private async saveRespositary() {
    await this.writeToJson(
      this.repository,
      this.repository.metaData?.path || ""
    );
    this.logger.setCustomProcessLog("Repositary", "Saved");
  }

  /**
   * Retreive latest thread message for send client
   */
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

  /**
   * Ask Question From Initiated Assistant and Update Chat History.
   */
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
      // Update current threds messages list
      this.updateThreadMessageList(this.thread?.id || "");

      // Save repositary
      this.saveRespositary();

      // Get latest thread message
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

  /**
   * Ask Question From Initiated Assistant with Streaming
   */
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

    console.log("run", run);

    return run;
  }
}
