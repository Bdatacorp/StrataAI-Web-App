"use client";

import * as echarts from "echarts";
import { useEffect, useRef, useState } from "react";
import { BarChart } from "echarts/charts";
import LoadingBarEChart from "./loading/loadingBarEChart";

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
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const chart = echarts.init(elementRef.current, null, {
      width: width || 600,
      height: height || 400,
    });
    chart.setOption(option);
    setLoading(false);
  }, [option, width, height]);

  return (
    <>
      {loading && <LoadingBarEChart />}
      <div ref={elementRef}></div>
    </>
  );
}
