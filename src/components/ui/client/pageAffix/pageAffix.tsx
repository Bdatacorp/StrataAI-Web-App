"use client";

import { Colors } from "@/lib/config/colors";
import { ActionIcon, Affix, Button, Transition } from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";
import { useEffect } from "react";
import { BsArrowUpCircle } from "react-icons/bs";
import { FaCircleChevronDown, FaCircleChevronUp } from "react-icons/fa6";

export default function PageAffix({
  scrollToFirstMessage,
  scrollToLastMessage,
}: {
  scrollToFirstMessage: () => void;
  scrollToLastMessage: () => void;
}) {
  return (
    <Affix position={{ bottom: 150, right: 20 }}>
      <div className="flex flex-col gap-2">
        {/* <Transition transition="slide-up" mounted={true}>
          {(transitionStyles) => (
            <ActionIcon
              style={transitionStyles}
              variant="transparent"
              onClick={scrollToFirstMessage}
            >
              <FaCircleChevronUp
                className="text-3xl opacity-35"
                color={Colors.primary}
              />
            </ActionIcon>
          )}
        </Transition> */}
        <Transition transition="slide-up" mounted={true}>
          {(transitionStyles) => (
            <ActionIcon
              style={transitionStyles}
              variant="transparent"
              onClick={scrollToLastMessage}
              className="animate__animated animate__shakeY animate__delay-2s animate__slower"
            >
              <FaCircleChevronDown
                className="text-3xl opacity-35"
                color={Colors.primary}
              />
            </ActionIcon>
          )}
        </Transition>
      </div>
    </Affix>
  );
}
