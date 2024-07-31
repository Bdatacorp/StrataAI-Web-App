"use client";
import { Breadcrumbs, Anchor } from "@mantine/core";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export type ContrlledBreadcrumbsItems = { title: string; href: string }[];

export default function ContrlledBreadcrumbs({
  items,
}: {
  items?: ContrlledBreadcrumbsItems;
}) {
  const [pathnameArray, setPathnameArray] = useState<string[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    const splittedPathname = pathname.split("/");
    setPathnameArray(splittedPathname);
  }, [pathname]);

  return (
    <>
      {items ? (
        <Breadcrumbs>
          {items.map((item, index) => (
            <Anchor c="dark" href={item.href} key={index}>
              {item.title}
            </Anchor>
          ))}
        </Breadcrumbs>
      ) : (
        <Breadcrumbs>
          <Anchor c="dark" href={routes.RAW_MATERIALS}>
            Home
          </Anchor>
          {pathnameArray.map(
            (item, index) =>
              index !== 0 && (
                <Anchor c="dark" href={pathname} key={index}>
                  {item}
                </Anchor>
              )
          )}
        </Breadcrumbs>
      )}
    </>
  );
}
