"use client";

import { ActionIcon, Button, Menu, rem, Text } from "@mantine/core";
import { deleteRawMaterialAction } from "@/server/actions/rawmaterials/deleteRawMaterials";
import { MdDelete, MdDisabledVisible } from "react-icons/md";
import { useState } from "react";
import { toast } from "react-toastify";
import { modals } from "@mantine/modals";
import { BsThreeDotsVertical } from "react-icons/bs";

export default function DangerZoneButton({
  id,
  deleteAction,
  disableAction,
}: {
  id?: string;
  deleteAction?: (id?: any) => Promise<void>;
  disableAction?: (id?: any) => Promise<void>;
}) {
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [disableLoading, setDisableLoading] = useState(false);

  async function deleteData() {
    setDeleteLoading(true);
    const deleted: any = id && deleteAction && (await deleteAction(id));

    if (deleted.status) {
      toast.success(deleted.message);
    } else {
      toast.error(deleted.message || "Couldn't delete");
    }

    setDeleteLoading(false);
  }

  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: "Delete",
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete? This action is destructive and you
          will have to contact support to restore your data.
        </Text>
      ),
      labels: { confirm: "Delete", cancel: "No don't delete it" },
      confirmProps: { color: "red" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => deleteData(),
    });

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <ActionIcon variant="transparent">
          <div>
          <BsThreeDotsVertical />
          </div>
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Danger zone</Menu.Label>

        {disableAction && (
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

        {deleteAction && (
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
      </Menu.Dropdown>
    </Menu>
  );
}
