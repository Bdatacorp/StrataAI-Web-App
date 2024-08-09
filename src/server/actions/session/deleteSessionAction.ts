"use server";

import authController from "@/server/app/auth/auth.controller";
import chatController from "@/server/app/chat/chat.controller";
import sessionController from "@/server/app/session/session.controller";

export default async function deleteSessionAction(sessionId: string) {
  const deletedSession = await sessionController.deleteSession(sessionId);
  return deletedSession;
}
