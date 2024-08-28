import { EChartsOption } from "echarts";
import React from "react";
import EChart from "./EChart";

export type TableAnalyticsOptions = EChartsOption & {
  width?: number;
  height?: number;
};

export default function TableAnalytics({
  options,
}: {
  options: TableAnalyticsOptions[];
}) {
  return (
    <div className="flex gap-4 p-2 py-4 items-center justify-start">
      {options.map((option, index) => (
        <EChart
          option={option}
          width={option?.width}
          height={option?.height}
          key={index}
        />
      ))}
    </div>
  );
}
