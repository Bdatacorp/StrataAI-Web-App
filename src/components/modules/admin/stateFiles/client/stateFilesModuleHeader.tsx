"use client";

import ModuleHeader, {
  ModuleHeaderPageTypes,
} from "@/components/general/modules/moduleHeader";
import { ContrlledBreadcrumbsItems } from "@/components/ui/client/breadcrumbs/contrlledBreadcrumbs";
import { Modules } from "@/lib/config/modules";
import { openCreateStateModel } from "@/lib/provider/features/state/state.slice";
import React from "react";

export default function StateFilesModuleHeader({
  stateName,
  stateId,
}: {
  stateName: string;
  stateId: string;
}) {
  const items: ContrlledBreadcrumbsItems = [
    { title: Modules.ADMIN.name, href: Modules.ADMIN.route },
    { title: Modules.ADMIN.STATE.name, href: Modules.ADMIN.STATE.route },
    {
      title: stateName,
      href: `${Modules.ADMIN.FILES_ACCOCIATED_STATE.route}/${stateId}`,
    },
  ];
  return (
    <ModuleHeader
      pageTypes={ModuleHeaderPageTypes.Table}
      moduleName={stateName}
      breadcrumbsItems={items}
    />
  );
}
