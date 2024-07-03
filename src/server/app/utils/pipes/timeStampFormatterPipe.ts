import React from "react";

export default function TimeStampFormatter(timestamp: string) {
  if (!timestamp) return;
  const date = new Date(timestamp);
  const formattedDate = date.toISOString().slice(0, 16).replace("T", " ");
  return formattedDate;
}
