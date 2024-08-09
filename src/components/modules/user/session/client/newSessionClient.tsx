"use client";

import { setNewSession } from "@/lib/provider/features/ui/ui.slice";
import { RootState } from "@/lib/provider/store";
import { Button, Modal, Select } from "@mantine/core";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { Modules } from "@/lib/config/modules";

/**
 * New Conversatio Modal
 *  - Create new sessin Token with state
 *  - Cannot close
 * @param {statesData}
 * @returns
 */
export default function NewSessionClient({
  statesData,
}: {
  statesData: { value: string; label: string }[];
}) {
  const [stateError, setStateError] = useState("");
  const [stateId, setStateId] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const newSessionOpend = useSelector(
    (state: RootState) => state.ui.newSession
  );
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams?.get("session") === "new") {
      dispatch(setNewSession(true));
    }
  }, [searchParams, dispatch]);

  const handleClose = async () => {
    if (stateId) {
      await handleContinue();
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
      dispatch(setNewSession(false));
      setLoading(false);
      router.push(Modules.USER.CHAT.route);
    }
  };

  return (
    <>
      <Modal
        opened={newSessionOpend}
        onClose={handleClose}
        title={
          <Image
            width={100}
            height={50}
            src="/img/strata-ai.png"
            alt="Strata-Logo"
          />
        }
        centered
        transitionProps={{
          transition: "fade",
          duration: 200,
          timingFunction: "linear",
        }}
        closeOnClickOutside={false}
        closeOnEscape={false}
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
