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
export default function readJsonFile<T>(file: string): T {
  try {
    const filePath = path.join(process.cwd(), file);

    const fileContent = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(fileContent) as T;
  } catch (error) {
    setErrorLogger(`Error reading or parsing file at`, error, file);
    throw error;
  }
}
