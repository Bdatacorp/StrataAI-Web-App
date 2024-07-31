"use client";
import { Box } from "@mantine/core";
import React, { ReactNode } from "react";
import FormControl from "./formControl";
import ServerFormLoadingOverlay from "./formLoadingOverlay";

export interface ServerFormPropos {
  children: ReactNode;
  action: any;
}

export default function ServerForm({ children, action }: ServerFormPropos) {
  return (
    <Box pos="relative" className="mb-12">
      <form action={action}>
        <ServerFormLoadingOverlay />
        <div className="flex flex-col gap-6">
          {/* Children */}
          <div className="flex flex-col gap-6">{children}</div>

          <div className="flex items-center justify-end gap-4 mt-5">
            <FormControl />
          </div>
        </div>
      </form>
    </Box>
  );
}
