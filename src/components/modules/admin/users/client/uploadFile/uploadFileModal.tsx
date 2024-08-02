"use client";

import DropZone from "@/components/ui/client/dropzone/dropzone";
import { Colors } from "@/lib/config/colors";
import { closeUploadFileModal } from "@/lib/provider/features/file/file.slice";
import { RootState } from "@/lib/provider/store";
import uploadFileAction from "@/server/actions/files/uploadFileAction";
import { Button, Group, Modal, rem, Stepper, TextInput } from "@mantine/core";
import { FileWithPath, PDF_MIME_TYPE } from "@mantine/dropzone";
import { Dispatch, SetStateAction, useState } from "react";
import { VscFilePdf } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function UploadFileModal() {
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [uploadLoading, setUploadLoading] = useState(false);

  const dispatch = useDispatch();
  const isModalOpened = useSelector(
    (state: RootState) => state.file.uploadFileModalOpened
  );

  const handleUploadSubmit = async () => {
    setUploadLoading(true);
    const formData = new FormData();
    formData.append("file", files[0]);

    const res = await uploadFileAction(formData);
    setUploadLoading(false);

    if (res.status == true) {
      toast.success(res.payload.message);
      setFiles([]);
      dispatch(closeUploadFileModal());
    } else {
      toast.error(res.payload.message);
    }
  };

  const hanleOnClose = () => {
    setFiles([]);
    dispatch(closeUploadFileModal());
  };

  return (
    <>
      <Modal opened={isModalOpened} onClose={hanleOnClose} centered size="lg">
        <DropZone
          loading={uploadLoading}
          title="Drag PDF here or click to select files"
          description="Attach a file. File should not exceed 5mb. Only allowed a file at a time"
          accept={PDF_MIME_TYPE}
          idleIcon={<VscFilePdf className="text-3xl" />}
          files={files}
          multiple={false}
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
