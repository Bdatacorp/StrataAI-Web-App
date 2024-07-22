import writeToJson from "../helper/writeToJson";
import writeToLogFile from "../helper/writeToLog";
import { LoggerEnv, LoggerTypes } from "./types";

export class Logger {
  private module: string;
  private type: LoggerTypes;
  private env: LoggerEnv;
  private writeToLogFile: typeof writeToLogFile;

  constructor(module = "default", type?: LoggerTypes, env = LoggerEnv.server) {
    this.env = env;
    this.type = type || LoggerTypes.process;
    this.module = module;
    this.writeToLogFile = writeToLogFile;
  }

  private getDate() {
    return new Date().toISOString();
  }

  setInitiatedLog(
    process: string,
    note?: string,
    module?: string,
    env: LoggerEnv = LoggerEnv.server,
  ) {
    "use server";
    const str = this.str({ type: LoggerTypes.initiate, process, note });
    this.processLogFile(env, str);
  }

  /**
   * Create Custom Event Log
   * label, event, ?note
   * date | Module | Label Event : note
   */
  setCustomProcessLog(
    label: string,
    event: string,
    note?: string,
    module?: string,
    env: LoggerEnv = LoggerEnv.server
  ) {
    "use server";
    const str = this.str({ type: event, process: label, note, module });
    this.processLogFile(env, str);
  }

  /**
   * Create Custom Event Log
   * label, event, ?note
   * date | Module | Label Result : JSON<any>
   */
  setResultLog(
    label: string,
    result: any,
    env: LoggerEnv = LoggerEnv.server,
    module?: string
  ) {
    "use server";
    const str = this.str({
      type: LoggerTypes.result,
      process: label,
      note: JSON.stringify(result),
      module,
    });
    this.processLogFile(env, str);
  }

  /**
   * Create Error Log
   * label, event, ?note
   * date | module | ?note | Error : err
   */
  setErrorLog(
    err?: any,
    note?: string,
    module?: string,
    env: LoggerEnv = LoggerEnv.server
  ) {
    "use server";
    const str = this.errorStr({ module, note, err });
    this.processLogFile(env, str);
  }

  /**
   * Create Success Log
   * label, event, ?note
   * date | module | ?note | Error : err
   */
  setSuccessLog(
    label: string,
    note?: string,
    module?: string,
    env: LoggerEnv = LoggerEnv.server
  ) {
    "use server";
    const str = this.str({ type: LoggerTypes.sucess, process: label, note });
    this.processLogFile(env, str);
  }

  /**
   * date | module | process type : note
   */
  private str({
    type,
    module,
    process,
    note,
  }: {
    type: string;
    module?: string;
    process: string;
    note?: string;
  }) {
    const str = `
    ${this.getDate()} 
    | ${module || this.module} 
    | ${process} ${type || this.type} ${note && " : " + note}\n`;
    return str;
  }

  /**
   * date | module | ?note | Error : err
   */
  private errorStr({
    module,
    note,
    err,
  }: {
    module?: string;
    note?: string;
    err?: any;
  }) {
    const str = `
    ${this.getDate()} 
    | ${module || this.module} 
    | ${LoggerTypes.error}
    | ${note}
    | : ${err}\n`;
    return str;
  }

  private processLogFile(env: LoggerEnv = LoggerEnv.server, string: string) {
    "use server";
    if (env === LoggerEnv.client) {
      this.writeToLogFile(string, "client.log");
    } else {
      this.writeToLogFile(string, "server.log");
    }
  }
}
