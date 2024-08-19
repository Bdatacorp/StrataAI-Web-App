import { Suspense } from "react";
import statesController from "@/server/app/state/state.controller";
import ElementLoading from "@/components/ui/client/loading/elementLoading";
import NewSessionClient from "../../session/client/newSessionClient";

async function FetchStates() {
  const states = await statesController.getAllState();

  const formattedStates = states.map((state) => ({
    value: state._id,
    label: state.name,
  }));

  return <NewSessionClient statesData={formattedStates} />;
}

const NewSessionServer = () => {
  return (
    <div className="w-full h-svh bg-white">
      <Suspense fallback={<ElementLoading />}>
        <FetchStates />
      </Suspense>
    </div>
  );
};

export default NewSessionServer;
