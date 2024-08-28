import { Skeleton } from "@mantine/core";
import React from "react";
import LoadingBarEChart from "./loadingBarEChart";

export default function LoadingTableAnalytics({ size }: { size: number }) {
  return (
    <div className="flex gap-4 p-2 py-4 items-center justify-start">
      {Array.from({ length: size }).map((i, index) => (
        <LoadingBarEChart key={index} />
      ))}
    </div>
  );
}
