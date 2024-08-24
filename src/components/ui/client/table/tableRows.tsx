"use client";
import {
  ActionIcon,
  Badge,
  Button,
  Checkbox,
  LoadingOverlay,
  Progress,
  RingProgress,
  Table,
  Text,
  Tooltip,
} from "@mantine/core";
import {
  DangerZoneElement,
  RowActionButton,
  TableActionIconsProps,
  TableColumns,
  TableRows,
  TableRowsActionTypes,
} from "./types";
import React, { ReactNode, useEffect } from "react";
import DangerZoneButton from "./dangerZoneButton/dangerZoneButton";
import { UnknownAction } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { IoMdEye } from "react-icons/io";
import { BiEdit } from "react-icons/bi";
import ElementLoading from "../loading/elementLoading";

export default function TableDataRows({
  columns,
  rows,
  actions,
  actionButtons,
  elements,
}: {
  columns: TableColumns[];
  rows: TableRows;
  actions?: TableActionIconsProps;
  actionButtons?: RowActionButton[];
  elements?: DangerZoneElement[];
}) {
  const { data } = rows;

  const dispatch = useDispatch();
  const router = useRouter();
  const dispatchView = actions?.view?.dispatchAction;
  const dispatchEdit = actions?.view?.dispatchAction;

  return (
    <>
      {data.map((rowData, supplierIndex) => (
        <Table.Tr key={supplierIndex}>
          <Table.Td className="w-5">
            <Checkbox aria-label="Select row" />
          </Table.Td>

          {columns.map(
            (
              {
                dataColumn,
                width,
                maxWidth,
                center,
                noWrap,
                label,
                elementFun,
              },
              index
            ) =>
              elementFun ? (
                elementFun(rowData)
              ) : (
                <React.Fragment key={index}>
                  {dataColumn === "index" && (
                    <Table.Td className="max-w-[5px] text-ellipsis overflow-hidden whitespace-nowrap">
                      {index}
                    </Table.Td>
                  )}

                  {dataColumn !== "status" && dataColumn !== "index" && (
                    <Table.Td
                      className={`
                        ${width && `w-[${width}px]`} 
                        ${
                          maxWidth ? `max-w-[${maxWidth}px]` : "lg:max-w-3"
                        } whitespace-nowrap truncate`}
                    >
                      {typeof rowData[dataColumn] === "object"
                        ? JSON.stringify(rowData[dataColumn])
                        : rowData[dataColumn]}
                    </Table.Td>
                  )}
                </React.Fragment>
              )
          )}

          {/* <Table.Td width={"80px"}>
            <Badge variant="light" color="teal" radius="sm">
              {rowData.status}
            </Badge>
          </Table.Td> */}

          <Table.Td className={`w-16`}>
            <div
              className={`flex ${
                actionButtons && actionButtons.length !== 0
                  ? "justify-between"
                  : "justify-start"
              } items-center gap-4`}
            >
              {actionButtons?.map(({ element, action, loading }, index) => (
                <div
                  key={index}
                  onClick={() => {
                    if (!loading) {
                      action(rowData);
                    }
                  }}
                  className="relative"
                >
                  {element}
                </div>
              ))}

              {actions?.view && (
                <Tooltip label="view">
                  <ActionIcon
                    variant="transparent"
                    onClick={() => {
                      actions.view?.type === TableRowsActionTypes.ACTION
                        ? dispatch(dispatchView(rowData))
                        : router.push(
                            `${actions.view?.navigationRoute}/${rowData._id}`
                          );
                    }}
                  >
                    <IoMdEye className="text-primary text-xl cursor-pointer text-Primary hover:text-Primary/90" />
                  </ActionIcon>
                </Tooltip>
              )}

              {actions?.edit && (
                <Tooltip label="view">
                  <ActionIcon
                    variant="transparent"
                    onClick={() => {
                      actions.edit?.type === TableRowsActionTypes.ACTION
                        ? dispatch(dispatchView(rowData))
                        : router.push(
                            `${actions.edit?.navigationRoute}/${rowData._id}`
                          );
                    }}
                  >
                    <div>
                      <BiEdit />
                    </div>
                  </ActionIcon>
                </Tooltip>
              )}

              <DangerZoneButton
                deleteAction={actions?.deleteAction}
                disableAction={actions?.disableAction}
                id={rowData._id}
                elements={elements}
              />
            </div>
          </Table.Td>
        </Table.Tr>
      ))}
    </>
  );
}
