import React from "react";
import Status from "../config/status";

const reverseStatus = Object.fromEntries(
  Object.entries(Status).map(([key, value]) => [value, key])
);

export default function StatusFormatter(status: number) {
  if (!status) return;
  const statusName = reverseStatus[status];
  return statusName;
}
