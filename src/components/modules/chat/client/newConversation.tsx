"use client";

import { closeConversation } from "@/lib/provider/features/ui/ui.slice";
import { RootState } from "@/lib/provider/store";
import { Button, Modal, Select } from "@mantine/core";
import Image from "next/image";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function NewConversation() {
  const [stateError, setStateError] = useState("");
  const newConversationOpend = useSelector(
    (state: RootState) => state.ui.newConversation
  );
  const dispatch = useDispatch();

  const handleClose = () => {
    setStateError("Please select the state before continue");
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
        closeOnClickOutside={false}
        closeOnEscape={false}
      >
        <div className="flex flex-col gap-5">
          <div className="text-primary font-bold">
            Select your state to continue
          </div>
          <Select
            placeholder="Select State"
            data={["Victoria", "Sidney"]}
            searchable
            error={stateError}
          />
          <Button className="bg-primary hover:bg-primary hover:opacity-90">
            Continue
          </Button>
        </div>
      </Modal>
    </>
  );
}
