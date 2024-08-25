"use client";
import ModuleHeader, {
  ModuleHeaderPageTypes,
} from "@/components/general/modules/moduleHeader";
import { ContrlledBreadcrumbsItems } from "@/components/ui/client/breadcrumbs/contrlledBreadcrumbs";
import { Modules } from "@/lib/config/modules";
import { openUploadFileModal } from "@/lib/provider/features/file/file.slice";
import React from "react";

export default function FileModuleHeader() {
  const items: ContrlledBreadcrumbsItems = [
    { title: Modules.ADMIN.name, href: Modules.ADMIN.route },
    { title: Modules.ADMIN.FILES.name, href: Modules.ADMIN.FILES.route },
  ];
  return (
    <ModuleHeader
      pageTypes={ModuleHeaderPageTypes.Table}
      moduleName={Modules.ADMIN.FILES.name}
      breadcrumbsItems={items}
      buttonName={`Upload ${Modules.ADMIN.FILES.name.slice(0, -1)}`}
      buttonAction={openUploadFileModal}
    />
  );
}
