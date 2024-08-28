import BarAnalytics from "@/components/ui/client/analytics/EChart";
import TableAnalytics, {
  TableAnalyticsOptions,
} from "@/components/ui/client/analytics/tableAnalytics";
import feedbackController from "@/server/app/feedback/feedbacks.controller";

import React, { Suspense } from "react";

async function FetchAnalytics() {
  const FeedbackAnalytics = await feedbackController.getAnalytics();

  const option: TableAnalyticsOptions = {
    width: 200,
    height: 180,
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "2%",
      left: "center",
    },
    series: [
      {
        name: "Analytics",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 5,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          {
            value: FeedbackAnalytics.feedbacksPositive,
            name: "Good",
            itemStyle: { color: "#0ca678" },
          },
          {
            value: FeedbackAnalytics.feedbacksNegative,
            name: "Bad",
            itemStyle: { color: "#F03E3E" },
          },
        ],
      },
    ],
  };

  return <TableAnalytics options={[option]} />;
}

export default function FeedbackAnalyticsServer() {
  return (
    <Suspense>
      <FetchAnalytics />
    </Suspense>
  );
}
