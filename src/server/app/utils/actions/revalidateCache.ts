"use server";

import { revalidateTag } from "next/cache";

export default async function revalidateCache(tag: any) {
  if (Array.isArray(tag)) {
    tag.forEach((t) => revalidateTag(t));
  } else {
    revalidateTag(tag);
  }
}
