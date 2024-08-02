"use server";

import { revalidateTag } from "next/cache";

export default async function revalidateCache(tags: string[]) {
  tags.forEach((tag) => revalidateTag(tag));
}
