"use server";

import { revalidateTag } from "next/cache";

export default async function revalidateCache(tags: string[]) {
  console.log(tags);
  
  tags.forEach((tag) => revalidateTag(tag));
}
