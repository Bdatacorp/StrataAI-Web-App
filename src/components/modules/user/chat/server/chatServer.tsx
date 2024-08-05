import { TableRows } from "@/components/ui/client/table/types";
import { Suspense } from "react";
import DataTableLoading from "@/components/ui/client/table/loading";

import statesController from "@/server/app/state/state.controller";
import ChatClient from "../client/chatClient";
import PageLoading from "@/components/ui/client/loading/pageLoading";
import ElementLoading from "@/components/ui/client/loading/elementLoading";

async function FetchTable() {
  return <ChatClient messages={[]} />;
}

const ChatServer = () => {
  return (
    <>
      <Suspense fallback={<ElementLoading />}>
        <FetchTable />
      </Suspense>
    </>
  );
};

export default ChatServer;
