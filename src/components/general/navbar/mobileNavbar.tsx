import authController from "@/server/app/auth/auth.controller";
import MobileNavbarClient from "./mobileNavbarClient";
import { Suspense } from "react";
import ElementLoading from "@/components/ui/client/loading/elementLoading";

async function FetchSessions() {
  "use server";
  const sessions = await authController.loadAllSessions();
  const activeSession = await authController.findActiveSession();
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
