import fs from "fs";
import path from "path";

/**
 * Ensures that the directory for the specified file path exists.
 * If the directory does not exist, it is created.
 *
 * @param filePath - The path of the file for which to ensure the directory exists.
 */
function directoryExistence(filePath: string): void {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return;
  }
  directoryExistence(dirname);
  fs.mkdirSync(dirname);
}

/**
 * Writes a log message to a log file. If the file does not exist, it is created.
 *
 * @param message - The log message to write.
 */
export default function writeToLogFile(message: string, file: string): void {
  const logDir = path.join(__dirname, "logs");
  const logFilePath = path.join(logDir, file);

  directoryExistence(logFilePath);

  const logMessage = `${new Date().toISOString()} - ${message}\n`;

  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) {
      console.error("Failed to write to log file:", err);
    } else {
      console.log("Log message written to file");
    }
  });
}
