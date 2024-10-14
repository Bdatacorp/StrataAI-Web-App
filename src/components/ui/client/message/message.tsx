"use client";

import {
  ClientMessage,
  MessageRoles,
} from "@/components/modules/user/chat/types";
import {
  ActionIcon,
  Badge,
  Code,
  CopyButton,
  Text,
  Tooltip,
} from "@mantine/core";
import Markdown from "react-markdown";
import CopyButtonElement from "../buttons/copyButton/copyButton";
import { MdEmail } from "react-icons/md";
import Image from "next/image";
import { toast } from "react-toastify";
import { Colors } from "@/lib/config/colors";
import { useDispatch } from "react-redux";
import { setAnnotationPDF } from "@/lib/provider/features/pdf/pdf.slice";
import FilesRoute from "@/server/app/files/files.routes";
import extractSourceNumber from "@/utils/client/helper/extractSourceNumber";
import MessageButtons from "./messageButtons";

export default function ChatMessage(message: ClientMessage) {
  const dispatch = useDispatch();
  return (
    <div className="w-full">
      {message.role === MessageRoles.Assistant ? (
        <div className="flex flex-col gap-2">
          <div>
            <Image
              src="/img/strata-ai.png"
              alt="Strata AI Assistant"
              width={70}
              height={30}
            />
          </div>

          <div className="bg-white p-5 rounded flex flex-col gap-3">
            <article className="prose ">
              <Markdown>{message.text}</Markdown>
            </article>

            <div className="w-full relative grid grid-cols-5 lg:grid-cols-10 gap-2">
              {message.metadata &&
                message.metadata?.map((metadata, index) => (
                  <div key={index}>
                    <Badge
                      className="cursor-pointer"
                      onClick={() =>
                        dispatch(
                          setAnnotationPDF({
                            url: `${process.env.NEXT_PUBLIC_AWS_S3_URL}/${metadata.filename}`,
                            page: parseInt(metadata.page),
                          })
                        )
                      }
                      color={Colors.primary}
                    >
                      {metadata.page}
                    </Badge>
                  </div>
                ))}
            </div>

            <MessageButtons message={message} />
          </div>
        </div>
      ) : (
        <div className="float-right bg-primary p-5 text-white rounded-2xl w-3/4 lg:w-7/12">
          <article className="prose text-white">
            <Markdown>{message.text}</Markdown>
          </article>
        </div>
      )}
    </div>
  );
}
