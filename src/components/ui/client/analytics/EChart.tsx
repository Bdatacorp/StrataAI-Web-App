"use client";

import * as echarts from "echarts";
import { useEffect, useRef, useState } from "react";
import { BarChart } from "echarts/charts";

export default function EChart({
  option,
  width,
  height,
}: {
  option: echarts.EChartsOption;
  width?: number;
  height?: number;
}) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chart = echarts.init(elementRef.current, null, {
      width: width || 600,
      height: height || 400,
    });
    chart.setOption(option);
  }, [option, width, height]);

  return <div ref={elementRef}></div>;
}
