"use client";
import { Box } from "@mantine/core";
import React, { ReactNode } from "react";
import FormLoadingOverlay from "./formLoadingOverlay";

export interface ServerFormPropos {
  children: ReactNode;
  action?: (payload: FormData) => void;
}

export default function ControlledForm({ children, action }: ServerFormPropos) {
  return (
    <Box pos="relative">
      <form action={action}>
        <FormLoadingOverlay />
        {children}
      </form>
    </Box>
  );
}
