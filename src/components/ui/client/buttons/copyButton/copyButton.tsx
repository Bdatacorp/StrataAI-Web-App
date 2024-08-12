"use client";

import { ActionIcon, CopyButton, rem, Tooltip } from "@mantine/core";
import { FaCheck } from "react-icons/fa6";
import { IoCopyOutline } from "react-icons/io5";

export default function CopyButtonElement({ value }: { value?: string }) {
  return (
    <CopyButton value={value || ""} timeout={2000}>
      {({ copied, copy }) => (
        <Tooltip color="gray" label={copied ? "Copied" : "Copy"} withArrow position="bottom">
          <ActionIcon
            color={copied ? "teal" : "gray"}
            variant="subtle"
            onClick={copy}
          >
            {copied ? (
              <FaCheck style={{ width: rem(16) }} />
            ) : (
              <IoCopyOutline style={{ width: rem(16) }} />
            )}
          </ActionIcon>
        </Tooltip>
      )}
    </CopyButton>
  );
}
