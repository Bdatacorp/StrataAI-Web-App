import { Metadata } from "next";
import { Modules } from "@/lib/config/modules";
import ResponseEventModuleHeader from "@/components/modules/admin/response-event/client/responseEventModuleHeader";
import ResponseEventServerTable from "@/components/modules/admin/response-event/server/responseEventServerTable";
import EventsAnalyticsServer from "@/components/modules/admin/response-event/server/eventsAnalyticsServer";

export const metadata: Metadata = {
  title: Modules.ADMIN.RESPONSE_EVENT.title,
  description: Modules.ADMIN.RESPONSE_EVENT.description,
};

const ResponseEventModule = () => {
  return (
    <>
      <ResponseEventModuleHeader />

      <EventsAnalyticsServer />

      <div className="overflow-x-scroll">
        <ResponseEventServerTable />
      </div>
    </>
  );
};

export default ResponseEventModule;
