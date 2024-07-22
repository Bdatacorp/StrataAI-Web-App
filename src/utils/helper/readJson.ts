import fs from "fs";
import path from "path";
import { setErrorLogger } from "../logger/loggerCall";

/**
 * Reads a JSON file and parses its content.
 *
 * @param filePath - The path to the JSON file.
 * @returns The parsed JSON content.
 * @throws Will throw an error if the file cannot be read or parsed.
 */
export default function readJsonFile<T>(filePath: string): T {
  try {
    const absolutePath = path.resolve(filePath);
    const fileContent = fs.readFileSync(absolutePath, "utf-8");
    return JSON.parse(fileContent) as T;
  } catch (error) {
    setErrorLogger(`Error reading or parsing file at`, error, filePath);
    throw error;
  }
}
