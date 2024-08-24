"use client";
import ModuleHeader, {
  ModuleHeaderPageTypes,
} from "@/components/general/modules/moduleHeader";
import { ContrlledBreadcrumbsItems } from "@/components/ui/client/breadcrumbs/contrlledBreadcrumbs";
import { Modules } from "@/lib/config/modules";
import { openUploadFileModal } from "@/lib/provider/features/file/file.slice";
import { modals } from "@mantine/modals";
import React from "react";
import SystemUsersCreate from "./systemUsersCreate";
import { openCreateSystemUserModel } from "@/lib/provider/features/ui/ui.slice";

export default function SystemUsersModuleHeader() {
  const items: ContrlledBreadcrumbsItems = [
    { title: Modules.ADMIN.name, href: Modules.ADMIN.route },
    {
      title: Modules.ADMIN.SYSTEM_USERS.name,
      href: Modules.ADMIN.SYSTEM_USERS.route,
    },
  ];

  const hanldeOnClose = () => {
    modals.closeAll();
  };

  return (
    <ModuleHeader
      pageTypes={ModuleHeaderPageTypes.Table}
      moduleName={Modules.ADMIN.SYSTEM_USERS.name}
      breadcrumbsItems={items}
      buttonName={`New ${Modules.ADMIN.SYSTEM_USERS.name.slice(0, -1)}`}
      buttonAction={openCreateSystemUserModel}
    />
  );
}
