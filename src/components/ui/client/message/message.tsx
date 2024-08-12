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
import CopyButtonElement from "../copyButton/copyButton";
import { MdEmail } from "react-icons/md";
import Image from "next/image";
import { toast } from "react-toastify";
import { Colors } from "@/lib/config/colors";
import { useDispatch } from "react-redux";
import { setAnnotationPDF } from "@/lib/provider/features/pdf/pdf.slice";
import FilesRoute from "@/server/app/files/files.routes";
import extractSourceNumber from "@/utils/client/helper/extractSourceNumber";

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

            <div className="w-full flex items-center gap-2">
              {message.annotation &&
                message.annotation?.map((annotation, index) => (
                  <Badge
                    className="cursor-pointer"
                    key={index}
                    onClick={() =>
                      dispatch(
                        setAnnotationPDF({
                          url: `${process.env.NEXT_PUBLIC_BASE_API_URL}${FilesRoute.VIEW}/${annotation.file_Id}`,
                          page:
                            extractSourceNumber(annotation.page as string) || 1,
                        })
                      )
                    }
                    color={Colors.primary}
                  >
                    {annotation.page}
                  </Badge>
                ))}
            </div>

            <div className="w-full flex justify-between items-center">
              <div className=" flex gap-2">
                <CopyButtonElement value={message.text} />

                <Tooltip label="Contact Manager">
                  <ActionIcon
                    variant="transparent"
                    color="gray"
                    className="hover:bg-gray-100"
                  >
                    <MdEmail />
                  </ActionIcon>
                </Tooltip>
              </div>
            </div>
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
