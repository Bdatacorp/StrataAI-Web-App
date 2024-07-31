"use client";

import ReturnButton from "@/components/ui/client/returnButton/returnButton";
import ContrlledBreadcrumbs, {
  ContrlledBreadcrumbsItems,
} from "@/components/ui/client/breadcrumbs/contrlledBreadcrumbs";
import { Button } from "@mantine/core";
import Link from "next/link";
import { ElementType, ReactElement, ReactNode } from "react";
import { Colors } from "@/lib/config/colors";
import { ActionCreatorWithoutPayload } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

export enum ModuleHeaderPageTypes {
  Table = "table",
  Form = "form",
}

export default function ModuleHeader({
  moduleName,
  breadcrumbsItems,
  buttonName,
  buttonAction,
  pageTypes = ModuleHeaderPageTypes.Table,
}: {
  moduleName: string;
  breadcrumbsItems?: ContrlledBreadcrumbsItems;
  buttonName: string;
  buttonAction: string | ActionCreatorWithoutPayload;
  pageTypes?: ModuleHeaderPageTypes;
}) {
  const dispatch = useDispatch();
  const router = useRouter();

  const hanldeButtonClick = () => {
    if (typeof buttonAction === "function") {
      dispatch(buttonAction());
    } else {
      router.push(buttonAction);
    }
  };

  return (
    <>
      <div className="flex md:flex-row flex-col md:items-center md:gap-0 gap-4 md:justify-between">
        <div className="flex flex-col gap-1">
          {/* TITLE */}
          <div>
            <h1 className="md:text-[30px] text-[25px] font-[600]">
              {moduleName}
            </h1>
          </div>

          {/* Breadcrumbs */}
          <ContrlledBreadcrumbs items={breadcrumbsItems} />
        </div>

        {pageTypes === ModuleHeaderPageTypes.Form && (
          <>
            <ReturnButton label={`Return to ${moduleName}`} />
          </>
        )}

        {/* BUTTON */}
        <div>
          <Button
            onClick={hanldeButtonClick}
            color={Colors.primary}
            w={150}
          >{`New ${buttonName}`}</Button>
        </div>
      </div>
    </>
  );
}
