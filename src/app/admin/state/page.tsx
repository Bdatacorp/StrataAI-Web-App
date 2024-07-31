import ModuleHeader, {
  ModuleHeaderPageTypes,
} from "@/components/general/modules/moduleHeader";
import TableWrapper from "@/components/ui/client/table/warapper/tableWrapper";
import { ContrlledBreadcrumbsItems } from "@/components/ui/client/breadcrumbs/contrlledBreadcrumbs";
import { Modules } from "@/lib/config/modules";
import StateServerTable from "@/components/modules/admin/state/server/stateServerTable";
import StateCreate from "@/components/modules/admin/state/client/stateCreate";

const StateModule = () => {
  const items: ContrlledBreadcrumbsItems = [
    { title: Modules.ADMIN.name, href: Modules.ADMIN.route },
    { title: Modules.ADMIN.STATE.name, href: Modules.ADMIN.STATE.route },
  ];

  return (
    <>
      <ModuleHeader
        pageTypes={ModuleHeaderPageTypes.Table}
        moduleName={Modules.ADMIN.STATE.name}
        breadcrumbsItems={items}
        buttonName={Modules.ADMIN.STATE.name}
        buttonLink={Modules.USER.CHAT.route}
      />

      <StateCreate/>

      <TableWrapper tableSection={<StateServerTable />} />
    </>
  );
};

export default StateModule;
