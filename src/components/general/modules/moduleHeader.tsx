import ReturnButton from "@/components/ui/client/returnButton/returnButton";
import ContrlledBreadcrumbs, {
  ContrlledBreadcrumbsItems,
} from "@/components/ui/client/breadcrumbs/contrlledBreadcrumbs";
import { Button } from "@mantine/core";
import Link from "next/link";
import { ElementType, ReactElement, ReactNode } from "react";

export enum ModuleHeaderPageTypes {
  Table = "table",
  Form = "form",
}

export default function ModuleHeader({
  moduleName,
  breadcrumbsItems,
  buttonName,
  buttonLink,
  pageTypes = ModuleHeaderPageTypes.Table,
}: {
  moduleName: string;
  breadcrumbsItems?: ContrlledBreadcrumbsItems;
  buttonName: string;
  buttonLink: string;
  pageTypes?: ModuleHeaderPageTypes;
}) {
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
          <Link
            href={buttonLink}
            className="text-white bg-primary md:py-[6px] py-[8px] flex items-center justify-center md:px-[40px] px-[50px] rounded-lg cursor-pointer hover:bg-primary/90 relative overflow-hidden isolate w-fit"
          >
            <span className="text-[15px]">{`New ${buttonName}`}</span>
          </Link>
        </div>
      </div>
    </>
  );
}
