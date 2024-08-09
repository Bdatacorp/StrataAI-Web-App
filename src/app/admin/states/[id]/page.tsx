import TableWrapper from "@/components/ui/client/table/warapper/tableWrapper";

import StateServerTable from "@/components/modules/admin/state/server/stateServerTable";
import StateCreate from "@/components/modules/admin/state/client/stateCreate/stateCreate";

import StateModuleHeader from "@/components/modules/admin/state/client/stateModuleHeader";
import { Metadata } from "next";
import { Modules } from "@/lib/config/modules";
import UploadFileToStateModal from "@/components/modules/admin/state/client/uploadFileToState/uploadFileToState";
import ModuleHeader, {
  ModuleHeaderPageTypes,
} from "@/components/general/modules/moduleHeader";
import StateFilesServerTable from "@/components/modules/admin/stateFiles/server/stateFilesServerTable";

export const metadata: Metadata = {
  title: Modules.ADMIN.STATE.title,
  description: Modules.ADMIN.STATE.description,
};

const StateFilesModule = ({ params }: { params: { id: string } }) => {
  return <StateFilesServerTable stateId={params.id} />;
};

export default StateFilesModule;
