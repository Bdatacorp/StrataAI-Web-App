"use client";
import ModuleHeader, {
  ModuleHeaderPageTypes,
} from "@/components/general/modules/moduleHeader";
import { ContrlledBreadcrumbsItems } from "@/components/ui/client/breadcrumbs/contrlledBreadcrumbs";
import { Modules } from "@/lib/config/modules";
import { openUploadFileModal } from "@/lib/provider/features/file/file.slice";
import React from "react";

export default function UsersModuleHeader() {
  const items: ContrlledBreadcrumbsItems = [
    { title: Modules.ADMIN.name, href: Modules.ADMIN.route },
    { title: Modules.ADMIN.USERS.name, href: Modules.ADMIN.USERS.route },
  ];
  return (
    <ModuleHeader
      pageTypes={ModuleHeaderPageTypes.Table}
      moduleName={Modules.ADMIN.USERS.name}
      breadcrumbsItems={items}
    />
  );
}
