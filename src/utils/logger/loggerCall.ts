import { Logger } from "./logger";
import { LoggerTypes } from "./types";

export function setErrorLogger(module: string, err: any, note?: string) {
  const logger = new Logger(module, LoggerTypes.error);
  logger.setErrorLog(err, note);
}

export function setSuccessLog(module: string, label: string, note?: string) {
  const logger = new Logger(module, LoggerTypes.sucess);
  logger.setSuccessLog(label, note, module);
}
