import TableWrapper from "@/components/ui/client/table/warapper/tableWrapper";

import StateServerTable from "@/components/modules/admin/state/server/stateServerTable";
import StateCreate from "@/components/modules/admin/state/client/stateCreate/stateCreate";

import StateModuleHeader from "@/components/modules/admin/state/client/stateModuleHeader";

const StateModule = () => {
  return (
    <>
      <StateModuleHeader />

      <StateCreate />

      <TableWrapper tableSection={<StateServerTable />} />
    </>
  );
};

export default StateModule;
