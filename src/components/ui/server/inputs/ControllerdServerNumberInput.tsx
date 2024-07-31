import {
  NumberInput,
  NumberInputProps,
  TextInput,
  TextInputProps,
} from "@mantine/core";
import React, { Dispatch } from "react";
import { inputDataHandleChange } from "../../client/clientForms/inputOnChnageFunctions";

export interface ControllerdServerNumberInputProps extends NumberInputProps {
  label: string;
  module?: string;
}

export default function ControllerdServerNumberInput({
  label,
  module,
  ...props
}: ControllerdServerNumberInputProps) {
  return (
    <NumberInput
      key={label}
      label={label}
      placeholder={`Enter ${module && module} ${label}`}
      {...props}
    />
  );
}
