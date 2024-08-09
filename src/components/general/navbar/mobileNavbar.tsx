
import MobileNavbarClient from "./mobileNavbarClient";
import { Suspense } from "react";
import ElementLoading from "@/components/ui/client/loading/elementLoading";
import sessionController from "@/server/app/session/session.controller";

async function FetchSessions() {
  "use server";
  const sessions = await sessionController.loadAllSessions();
  const activeSession = await sessionController.findActiveSession();
  return (
    <MobileNavbarClient activeSession={activeSession} sessions={sessions} />
  );
}

export default function MobileNavbar() {
  return (
    <Suspense fallback={<ElementLoading />}>
      <FetchSessions />
    </Suspense>
  );
}
