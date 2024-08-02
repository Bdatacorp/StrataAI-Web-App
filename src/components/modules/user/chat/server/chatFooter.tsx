"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/lib/provider/store";

export default function ChatFooter() {
  const streamingResponse = useSelector(
    (state: RootState) => state.ui.streamingResponse
  );

  return (
    <div className="absolute w-full bottom-0 h-[6.5rem] lg:h-24 bg-white flex flex-col items-center justify-center gap-2">
      {/* <div className="hidden lg:flex w-full lg:w-[40%]"></div> */}
      <div className="w-full">
        {/* {streamingResponse ? <ChatClientFormStreaming /> : <ChatClientForm />} */}
      </div>
      <div className="text-[10px] text-center px-4 lg:px-28">
        Strata Chat AI may occasionally provide inaccurate information. It is
        important to verify critical details and seek legal advice before making
        any decisions or taking action.
      </div>
    </div>
  );
}
