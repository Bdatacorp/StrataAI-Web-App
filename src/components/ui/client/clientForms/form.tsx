"use client";
import { Box, Input, NumberInput, Textarea, TextInput } from "@mantine/core";
import React, { FormEvent, ReactNode, useState } from "react";
import DangerButton from "../buttons/dangerButton";
import PrimaryButton from "../buttons/primaryButton";
import { GrPowerReset } from "react-icons/gr";
import { BiSave } from "react-icons/bi";
import FormLoadingOverlay from "./formLoadingOverlay";

export interface formPropos {
  elements: ReactNode[];
  errors?: any;
  onSubmit: () => void;
  formLoading: boolean;
}

export default function Form({
  elements,
  errors,
  onSubmit,
  formLoading,
}: formPropos) {
  return (
    <Box pos="relative">
      <FormLoadingOverlay loading={formLoading} />
      <div className="flex flex-col gap-6">
        {/* Children */}
        <div className="flex flex-col gap-6">
          {elements?.map((Element: any, index) => (
            <div className="flex flex-col gap-2" key={index}>
              <div>
                <span className="text-[15px] font-[700]">{Element.key}</span>
              </div>
              <div>{Element}</div>
            </div>
          ))}
        </div>
        
        <div className="flex items-center justify-end gap-4 mt-5">
          <DangerButton leftSection={<GrPowerReset />}>Reset</DangerButton>
          <PrimaryButton
            loading={formLoading}
            onClick={onSubmit}
            leftSection={<BiSave />}
          >
            Save
          </PrimaryButton>
        </div>
      </div>
    </Box>
  );
}
