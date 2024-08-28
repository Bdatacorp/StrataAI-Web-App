import { Skeleton } from "@mantine/core";
import React from "react";

export default function LoadingBarEChart() {
  return (
    <div className="flex flex-col gap-2 items-center">
      <div className="flex gap-4">
        <Skeleton height={10} width={50} radius={3} />
        <Skeleton height={10} width={50} radius={3} />
      </div>
      <Skeleton height={150} width={150} circle />
    </div>
  );
}
