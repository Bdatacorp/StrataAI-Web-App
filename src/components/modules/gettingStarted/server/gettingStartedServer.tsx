import statesController from "@/server/app/state/state.controller";
import Image from "next/image";
import React, { Suspense } from "react";
import GettingStartedForm from "../client/gettingStartedForm";
import { UserType } from "@/server/app/auth/auth.types";
import ElementLoading from "@/components/ui/client/loading/elementLoading";
import delay from "@/utils/client/services/delay";
import AbsoluteLoading from "@/components/ui/client/loading/absoluteLoading";

async function FetchStates() {
  "use server";
  const states = await statesController.getAllState();
  const formatted = states.map((state) => ({
    value: state._id,
    label: state.name,
  }));

  // await delay(5000);

  return (
    <GettingStartedForm
      UserTypesData={[UserType.MANAGER, UserType.OWNER]}
      StatesData={formatted}
    />
  );
}

export default function GettingStartedServer() {
  return (
    <>
      <AbsoluteLoading />
      <div className="w-full lg:h-svh flex flex-col-reverse lg:flex-row">
        <div className="w-full lg:w-2/5 flex justify-center items-center">
          <Image
            alt="Strata Login Bg"
            src={"/img/chatbot.png"}
            width={500}
            height={100}
          />
        </div>
        <div className="grow overflow-x-scroll p-8 lg:p-10 lg:px-20">
          <Suspense fallback={<ElementLoading />}>
            <FetchStates />
          </Suspense>
        </div>
      </div>
    </>
  );
}
