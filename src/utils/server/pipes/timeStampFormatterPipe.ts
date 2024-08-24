import React from "react";

export default function TimeStampFormatter(timestamp: string) {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  const formattedDate = date.toLocaleString();
  return formattedDate;
}
