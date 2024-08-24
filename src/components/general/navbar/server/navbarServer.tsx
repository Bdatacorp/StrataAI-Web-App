import React, { Suspense } from "react";
import sessionController from "@/server/app/session/session.controller";
import ElementLoading from "@/components/ui/client/loading/elementLoading";
import NavbarClient from "../client/navbarClient";
import { NavBarContentTypeEnum } from "../type";

async function FetchSessions() {
  "use server";
  const sessions = await sessionController.loadAllSessions();
  const activeSession = await sessionController.findActiveSession();
  return <NavbarClient type={NavBarContentTypeEnum.Public} activeSession={activeSession} sessions={sessions} />;
}


export default function NavbarServer() {
  return (
    <Suspense fallback={<ElementLoading />}>
      <FetchSessions />
    </Suspense>
  );
}
