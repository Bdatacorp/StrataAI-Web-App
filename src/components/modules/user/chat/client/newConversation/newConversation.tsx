"use client";

import { closeConversation } from "@/lib/provider/features/ui/ui.slice";
import { RootState } from "@/lib/provider/store";
import generateRandomToken from "@/utils/client/generators/randomToken";
import userSession, {
  UserSessionMethods,
} from "@/utils/client/generators/userSession";
import { Button, Modal, Select } from "@mantine/core";
import Image from "next/image";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";

/**
 * New Conversatio Modal
 *  - Create new sessin Token with state
 *  - Can close
 * @param {statesData}
 * @returns
 */
export default function NewConversation({
  statesData,
}: {
  statesData: { value: string; label: string }[];
}) {
  const [stateError, setStateError] = useState("");
  const [stateId, setStateId] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const newConversationOpend = useSelector(
    (state: RootState) => state.ui.newConversation
  );
  const dispatch = useDispatch();
  const router = useRouter();

  const handleClose = () => {
    const session_id = localStorage.getItem("session_id") as string;
    const state = localStorage.getItem("state") as string;

    if (session_id && state) {
      dispatch(closeConversation());
    } else {
      setStateError("Please select the state before continue");
    }
  };

  const handleContinue = async () => {
    setLoading(true);
    setStateError("");

    const result: any = await signIn("initSession", {
      redirect: false,
      stateId,
    });

    if (result?.error) {
      setLoading(false);
      const res = await JSON.parse(result.error);
      if (res && res.zodErrors) {
        setStateError(res.zodErrors?.stateId?.message);
      } else if (res?.payload?.message) {
        toast.error(res?.payload?.message);
      } else {
        toast.error("Origin is unreachable");
      }
    } else {
      dispatch(closeConversation());
      setLoading(false);
      window.location.reload();
    }
  };

  return (
    <>
      <Modal
        opened={newConversationOpend}
        onClose={handleClose}
        title={
          <Image
            width={35}
            height={35}
            src="/img/Strata-Logo.png"
            alt="Strata-Logo"
          />
        }
        centered
        transitionProps={{
          transition: "fade",
          duration: 200,
          timingFunction: "linear",
        }}
      >
        <div className="flex flex-col gap-5">
          <div className="text-primary font-bold">
            Select your state to continue
          </div>
          <Select
            placeholder="Select State"
            data={statesData}
            searchable
            onChange={(e) => setStateId(e)}
            error={stateError}
          />
          <Button
            loading={loading}
            onClick={handleContinue}
            className="bg-primary hover:bg-primary hover:opacity-90"
          >
            Continue
          </Button>
        </div>
      </Modal>
    </>
  );
}
