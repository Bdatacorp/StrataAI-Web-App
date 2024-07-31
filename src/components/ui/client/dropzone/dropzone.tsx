"use client";

import { Group, Image, rem, SimpleGrid, Text } from "@mantine/core";
import {
  Dropzone,
  DropzoneProps,
  FileRejection,
  FileWithPath,
  IMAGE_MIME_TYPE,
  PDF_MIME_TYPE,
} from "@mantine/dropzone";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { isMobile } from "react-device-detect";
import { BiPhotoAlbum, BiUpload, BiX } from "react-icons/bi";
import { toast, ToastContainer } from "react-toastify";

interface DropZoneProps extends Partial<DropzoneProps> {
  title: string;
  description: string;
  idleIcon?: ReactNode;
  files: FileWithPath[];
  setFiles: Dispatch<SetStateAction<FileWithPath[]>>;
}

export default function DropZone({
  title,
  description,
  idleIcon,
  files,
  setFiles,
  ...props
}: DropZoneProps) {
  const handleOnReject = (files: FileRejection[]) => {
    const str = files.map((file) => file.file.name).join();
    toast.error(`${str} not allowed file type`);
  };

  const previews = files.map((file, index) => {
    const url = URL.createObjectURL(file);

    return props.accept === IMAGE_MIME_TYPE ? (
      <Image
        alt={file.name}
        key={index}
        src={url}
        onLoad={() => URL.revokeObjectURL(url)}
      />
    ) : (
      <>
        <div className="flex flex-col justify-center items-center text-center">
          {idleIcon}
          <span>{file.name}</span>
        </div>
      </>
    );
  });

  return (
    <>
      <Dropzone
        onDrop={setFiles}
        onReject={(files) => handleOnReject(files)}
        maxSize={5 * 1024 ** 2}
        {...props}
      >
        <Group
          justify="center"
          gap="md"
          mih={isMobile ? 100 : 220}
          style={{ pointerEvents: "none" }}
        >
          <Dropzone.Accept>
            <BiUpload
              style={{
                width: rem(52),
                height: rem(52),
                color: "var(--mantine-color-blue-6)",
              }}
            />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <BiX
              style={{
                width: rem(52),
                height: rem(52),
                color: "var(--mantine-color-red-6)",
              }}
            />
          </Dropzone.Reject>
          <Dropzone.Idle>
            {idleIcon && previews.length == 0 && idleIcon}
          </Dropzone.Idle>
          {previews.length > 0 ? (
            <div className="grid gap-4">{previews}</div>
          ) : (
            <div className="text-center lg:text-start">
              <Text size={isMobile ? "sm" : "lg"} inline>
                {title}
              </Text>
              <Text size={isMobile ? "xs" : "sm"} c="dimmed" inline mt={7}>
                {description}
              </Text>
            </div>
          )}
        </Group>
      </Dropzone>
    </>
  );
}
