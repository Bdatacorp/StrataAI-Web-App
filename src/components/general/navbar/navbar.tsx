import React, { Suspense } from "react";
import NavBarContent from "./navBarContent";
import sessionController from "@/server/app/session/session.controller";
import DesktopNavbar from "./desktop/desktopNavbar";
import ElementLoading from "@/components/ui/client/loading/elementLoading";
import MobileNavbar from "./mobile/mobileNavbar";

async function FetchSessions() {
  "use server";
  const sessions = await sessionController.loadAllSessions();
  const activeSession = await sessionController.findActiveSession();
  return (
    <>
      <div className="hidden md:block min-w-[23%] max-w-[23%] max-h-full relative">
        <DesktopNavbar activeSession={activeSession} sessions={sessions} />
      </div>
      <div className="hidden h-full">
        <MobileNavbar activeSession={activeSession} sessions={sessions} />
      </div>
    </>
  );
}

export default function Navbar() {
  return (
    <Suspense fallback={<ElementLoading />}>
      <FetchSessions />
    </Suspense>
  );
}
