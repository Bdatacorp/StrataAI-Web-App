"use client";

import { closeCreateStateModel } from "@/lib/provider/features/state/state.slice";
import { RootState } from "@/lib/provider/store";
import { Modal, TextInput } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useDispatch, useSelector } from "react-redux";

export default function StateCreate() {
  const isCreateModalOpened = useSelector(
    (state: RootState) => state.state.isCreateStateModelOpened
  );

  const dispatch = useDispatch();

  return (
    <>
      <Modal
        opened={isCreateModalOpened}
        onClose={() => dispatch(closeCreateStateModel())}
        title="Create State"
        centered
      >
        {/* Modal content */}
      </Modal>
    </>
  );
}
