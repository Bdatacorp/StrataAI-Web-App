"use client";

import ModuleHeader, {
  ModuleHeaderPageTypes,
} from "@/components/general/modules/moduleHeader";
import { ContrlledBreadcrumbsItems } from "@/components/ui/client/breadcrumbs/contrlledBreadcrumbs";
import { Modules } from "@/lib/config/modules";
import { openCreateStateModel } from "@/lib/provider/features/state/state.slice";
import React from "react";

export default function FeedbackModuleHeader() {
  const items: ContrlledBreadcrumbsItems = [
    { title: Modules.ADMIN.name, href: Modules.ADMIN.route },
    {
      title: Modules.ADMIN.FEEDBACKS.name,
      href: Modules.ADMIN.FEEDBACKS.route,
    },
  ];
  return (
    <ModuleHeader
      pageTypes={ModuleHeaderPageTypes.Table}
      moduleName={Modules.ADMIN.FEEDBACKS.name}
      breadcrumbsItems={items}
    />
  );
}
