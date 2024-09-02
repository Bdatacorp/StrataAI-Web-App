"use client";

import DropZone from "@/components/ui/client/dropzone/dropzone";
import { Colors } from "@/lib/config/colors";
import {
  closeCreateStateModel,
  closeUploadFileToStateModal,
} from "@/lib/provider/features/state/state.slice";
import { RootState } from "@/lib/provider/store";
import uploadToStateAction from "@/server/actions/files/uploadToStateAction";
import { Button, Group, Modal, rem, Stepper, TextInput } from "@mantine/core";
import { FileWithPath, PDF_MIME_TYPE } from "@mantine/dropzone";
import { Dispatch, SetStateAction, useState } from "react";
import { isMobile } from "react-device-detect";
import { TbCircleX } from "react-icons/tb";
import { VscFilePdf } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function UploadFileToStateModal() {
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [uploadLoading, setUploadLoading] = useState(false);

  const dispatch = useDispatch();
  const isModalOpened = useSelector(
    (state: RootState) => state.state.uploadFileToStateModal.opened
  );
  const stateId = useSelector(
    (state: RootState) => state.state.uploadFileToStateModal.id
  );

  const handleUploadSubmit = async () => {
    if (!stateId)
      return toast.error("Please create state name before the continue");

    setUploadLoading(true);
    const formData = new FormData();
    formData.append("stateId", stateId);
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    const res = await uploadToStateAction(formData);
    setUploadLoading(false);

    if (res.status == true) {
      toast.success(res.payload.message);
      dispatch(closeUploadFileToStateModal());
    } else {
      toast.error(res.payload.message);
    }
  };

  const hanleOnClose = () => {
    setFiles([]);
    dispatch(closeUploadFileToStateModal());
  };

  return (
    <>
      <Modal opened={isModalOpened} onClose={hanleOnClose} centered size="lg">
        <DropZone
          loading={uploadLoading}
          title="Drag PDF here or click to select files"
          description="Attach as many files as you like, each file should not exceed 5mb"
          accept={PDF_MIME_TYPE}
          idleIcon={<VscFilePdf className="text-3xl" />}
          files={files}
          setFiles={setFiles}
        />

        <Group justify="center" mt="xl">
          <Button
            loading={uploadLoading}
            color="red"
            variant="light"
            onClick={() => setFiles([])}
          >
            Reset
          </Button>
          <Button
            loading={uploadLoading}
            color={Colors.primary}
            onClick={handleUploadSubmit}
          >
            Upload
          </Button>
        </Group>
      </Modal>
    </>
  );
}
