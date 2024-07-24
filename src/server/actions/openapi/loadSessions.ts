"use server";

import data from "./data.json";

import { ChatMessage } from "@/server/app/chat/chat.types";
import { IThread, ThreadMessages } from "./types";

export default async function loadSessions() {
  let threads: IThread[] = data.threds;

  if (threads) {
    console.log("Load Sessions : ", threads);

    return {
      status: true,
      payload: threads,
    };
  } else {
    return {
      status: false,
      payload: [],
    };
  }
}
