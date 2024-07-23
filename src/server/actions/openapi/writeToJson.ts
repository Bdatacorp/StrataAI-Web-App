"use server";

import fs from "fs";
import path from "path";

export default async function (data: Object, file: string) {
  try {
    const filePath = path.join(process.cwd(), file);
    await fs.promises.writeFile(
      filePath,
      JSON.stringify(data, null, 2),
      "utf8"
    );
    console.log("JSON file has been updated.");
  } catch (error) {
    console.error("Error writing to JSON file:", error);
  }
}
