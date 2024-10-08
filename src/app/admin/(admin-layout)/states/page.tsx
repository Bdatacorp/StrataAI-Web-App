import TableWrapper from "@/components/ui/client/table/warapper/tableWrapper";

import StateServerTable from "@/components/modules/admin/state/server/stateServerTable";
import StateCreate from "@/components/modules/admin/state/client/stateCreate/stateCreate";

import StateModuleHeader from "@/components/modules/admin/state/client/stateModuleHeader";
import { Metadata } from "next";
import { Modules } from "@/lib/config/modules";
import UploadFileToStateModal from "@/components/modules/admin/state/client/uploadFileToState/uploadFileToState";

export const metadata: Metadata = {
  title: Modules.ADMIN.STATE.title,
  description: Modules.ADMIN.STATE.description,
};

const StateModule = () => {
  return (
    <>
      <StateModuleHeader />

      <StateCreate />

      <UploadFileToStateModal/>

      <TableWrapper tableSection={<StateServerTable />} />
    </>
  );
};

export default StateModule;
