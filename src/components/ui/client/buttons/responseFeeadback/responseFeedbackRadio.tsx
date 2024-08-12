"use client";

import { Colors } from "@/lib/config/colors";
import createFeedbackAction from "@/server/actions/feedback/createFeedbackAction";
import { FeedbackType } from "@/server/app/chat/chat.types";
import { ActionIcon, ActionIconGroup, Group, Tooltip } from "@mantine/core";
import { useEffect, useState } from "react";
import {
  MdOutlineThumbDown,
  MdOutlineThumbUp,
  MdThumbDown,
  MdThumbUp,
} from "react-icons/md";
import { toast } from "react-toastify";

export default function ResponseFeedbackRadio({
  messageId,
}: {
  messageId: string;
}) {
  const [goodClicked, setGoodClicked] = useState<boolean>(false);
  const [goodClickLoading, setGoodClickLoading] = useState<boolean>(false);
  const [badClicked, setBadClicked] = useState<boolean>(false);
  const [badClickLoading, setBadClickLoading] = useState<boolean>(false);

  const handleGoodResponseClick = async () => {
    resetState();
    setGoodClicked(true);
    setGoodClickLoading(true);

    const res = await createFeedbackAction({
      type: FeedbackType.Good,
      messageId,
    });

    if ("status" in res) {
      res.status && toast.success("Thank you for your feedback");
    }

    setGoodClickLoading(false);
  };

  const handleBadResponseClick = async () => {
    resetState();
    setBadClicked(true);
    setBadClickLoading(true);

    const res = await createFeedbackAction({
      type: FeedbackType.Bad,
      messageId,
    });

    if ("status" in res) {
      res.status && toast.success("Thank you for your feedback");
    }

    setBadClickLoading(false);
  };

  const resetState = () => {
    setGoodClickLoading(false);
    setGoodClicked(false);
    setBadClickLoading(false);
    setBadClicked(false);
  };

  return (
    <>
      <Group>
        <Tooltip label={"Good Response"} color="gray" position="bottom">
          <ActionIcon
            loading={goodClickLoading}
            loaderProps={{ color: Colors.primary }}
            variant="subtle"
            onClick={handleGoodResponseClick}
            color="gray"
            className="hover:bg-gray-100"
          >
            {goodClicked ? <MdThumbUp /> : <MdOutlineThumbUp />}
          </ActionIcon>
        </Tooltip>
        <Tooltip label={"Bad Response"} color="gray" position="bottom">
          <ActionIcon
            loading={badClickLoading}
            loaderProps={{ color: Colors.primary }}
            variant="subtle"
            onClick={handleBadResponseClick}
            color="gray"
            className="hover:bg-gray-100"
          >
            {badClicked ? <MdThumbDown /> : <MdOutlineThumbDown />}
          </ActionIcon>
        </Tooltip>
      </Group>
    </>
  );
}
