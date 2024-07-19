"use server";

import fs from "fs";
import path from "path";

export default async function (data: Object, file: string) {
  const jsonFilePath = path.resolve(process.cwd(), file);

  const filePath = path.join(process.cwd(), file);

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}
