import BarAnalytics from "@/components/ui/client/analytics/EChart";
import TableAnalytics, {
  TableAnalyticsOptions,
} from "@/components/ui/client/analytics/tableAnalytics";
import responseEventController from "@/server/app/response-event/response-event.controller";

import React, { Suspense } from "react";

async function FetchAnalytics() {
  const eventsAnalytics = await responseEventController.getAnalytics();

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
            value: eventsAnalytics.repliedEvents,
            name: "Replied",
            itemStyle: { color: "#F03E3E" },
          },
          {
            value: eventsAnalytics.unRepliedEvents,
            name: "Unreplied",
            itemStyle: { color: "#f59f00" },
          },
        ],
      },
    ],
  };

  return <TableAnalytics options={[option]} />;
}

export default function EventsAnalyticsServer() {
  return (
    <Suspense>
      <FetchAnalytics />
    </Suspense>
  );
}
