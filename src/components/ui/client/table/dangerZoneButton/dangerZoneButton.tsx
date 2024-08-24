"use client";

import { ActionIcon, Button, Menu, rem, Text } from "@mantine/core";
import { MdDelete, MdDisabledVisible } from "react-icons/md";
import { useState } from "react";
import { toast } from "react-toastify";
import { modals } from "@mantine/modals";
import { BsThreeDotsVertical } from "react-icons/bs";
import { DangerZoneElement } from "../types";

export default function DangerZoneButton({
  id,
  deleteAction,
  disableAction,
  elements,
}: {
  id?: string;
  deleteAction?: {
    confirmMessage?: string;
    action: (id?: any) => Promise<void>;
  };
  disableAction?: {
    confirmMessage?: string;
    action: (id?: any) => Promise<void>;
  };
  elements?: DangerZoneElement[];
}) {
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [disableLoading, setDisableLoading] = useState(false);

  async function deleteData() {
    if (deleteAction) {
      setDeleteLoading(true);
      const deleted: any = await deleteAction.action(id);

      console.log(deleted);

      if (deleted.status) {
        toast.success(deleted.payload.message);
      } else {
        toast.error(deleted.payload.message || "Couldn't delete");
      }

      setDeleteLoading(false);
    }
  }

  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: "Delete",
      centered: true,
      children: (
        <Text size="sm">
          {deleteAction?.confirmMessage
            ? deleteAction.confirmMessage
            : "Are you sure you want to delete? This action is destructive and you will have to contact support to restore your data."}
        </Text>
      ),
      labels: { confirm: "Delete", cancel: "No don't delete it" },
      confirmProps: { color: "red" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => deleteData(),
    });

  const openElementModal = (element: DangerZoneElement) =>
    modals.openConfirmModal({
      title: element.label,
      centered: true,
      children: <Text size="sm">{element.confirmMessage}</Text>,
      labels: { confirm: element.label, cancel: "Cancel" },
      confirmProps: { color: "red" },
      onCancel: () => console.log("Cancel"),
      onConfirm: async () => elemetConfirm(element),
    });

  const elemetConfirm = async (element: DangerZoneElement) => {
    const deleted: any = id && element && (await element.action(id));

    if (deleted.status) {
      toast.success(deleted.message);
    } else {
      toast.error(deleted.message || "Request Failed");
    }
  };

  return (
    <Menu shadow="md" width={180}>
      <Menu.Target>
        <ActionIcon variant="transparent">
          <div>
            <BsThreeDotsVertical className="text-primary" />
          </div>
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Danger zone</Menu.Label>

        {disableAction?.action && (
          <Menu.Item>
            <Button
              color="red"
              size="compact-xs"
              variant="transparent"
              loading={disableLoading}
              loaderProps={{ type: "bars" }}
              leftSection={<MdDisabledVisible />}
              fullWidth
            >
              Disable
            </Button>
          </Menu.Item>
        )}

        {deleteAction?.action && (
          <Menu.Item onClick={openDeleteModal}>
            <Button
              color="red"
              size="compact-xs"
              variant="transparent"
              loading={deleteLoading}
              loaderProps={{ type: "bars" }}
              leftSection={<MdDelete />}
              fullWidth
            >
              Delete
            </Button>
          </Menu.Item>
        )}

        {elements &&
          elements.map((element, index) => (
            <Menu.Item key={index} onClick={() => openElementModal(element)}>
              <Button
                color="red"
                size="compact-xs"
                variant="transparent"
                loaderProps={{ type: "bars" }}
                leftSection={element.icon}
                fullWidth
              >
                {element.label}
              </Button>
            </Menu.Item>
          ))}
      </Menu.Dropdown>
    </Menu>
  );
}
