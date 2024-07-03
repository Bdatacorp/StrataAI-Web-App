"use client";

import { LoadingOverlay } from "@mantine/core";
import { useFormStatus } from "react-dom";

export default function FormLoadingOverlay() {
  const { pending } = useFormStatus();
  return (
    <LoadingOverlay
      zIndex={1000}
      visible={pending}
      overlayProps={{ radius: "sm", blur: 0.3 }}
      loaderProps={{ type: "bars" }}
    />
  );
}
