import { Suspense } from "react";
import usersController from "@/server/app/users/users.controller";
import NavbarClient from "@/components/general/navbar/client/navbarClient";
import ElementLoading from "@/components/ui/client/loading/elementLoading";
import { NavBarContentTypeEnum } from "@/components/general/navbar/type";
import NavbarLoading from "@/components/general/navbar/client/navbarLoading";

async function FetchSessions({ token }: { token: string }) {
  "use server";

  const sessions = await usersController.getAllUserSessions(token);
  const activeSession = await usersController.getUserActiveSession(token);

  return (
    <NavbarClient
      type={NavBarContentTypeEnum.Admin}
      activeSession={activeSession._id}
      sessions={sessions}
      token={token}
    />
  );
}

export default function AdminMessagesNavbar({ token }: { token: string }) {
  return (
    <Suspense fallback={<NavbarLoading />}>
      <FetchSessions token={token} />
    </Suspense>
  );
}
