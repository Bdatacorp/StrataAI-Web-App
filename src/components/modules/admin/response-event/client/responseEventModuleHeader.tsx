"use client";

import ModuleHeader, {
  ModuleHeaderPageTypes,
} from "@/components/general/modules/moduleHeader";
import { ContrlledBreadcrumbsItems } from "@/components/ui/client/breadcrumbs/contrlledBreadcrumbs";
import { Modules } from "@/lib/config/modules";
import { openCreateStateModel } from "@/lib/provider/features/state/state.slice";
import React from "react";

export default function ResponseEventModuleHeader() {
  const items: ContrlledBreadcrumbsItems = [
    { title: Modules.ADMIN.name, href: Modules.ADMIN.route },
    {
      title: Modules.ADMIN.RESPONSE_EVENT.name,
      href: Modules.ADMIN.RESPONSE_EVENT.route,
    },
  ];
  return (
    <ModuleHeader
      pageTypes={ModuleHeaderPageTypes.Table}
      moduleName={Modules.ADMIN.RESPONSE_EVENT.name}
      breadcrumbsItems={items}
    />
  );
}
