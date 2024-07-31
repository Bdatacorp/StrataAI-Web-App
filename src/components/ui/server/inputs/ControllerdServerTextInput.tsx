import { TextInput, TextInputProps } from "@mantine/core";
import React, { Dispatch } from "react";
import { inputDataHandleChange } from "../../client/clientForms/inputOnChnageFunctions";

export interface ControllerdServerTextInputProps extends TextInputProps {
  error: string;
  label: string;
  name: string;
  module?: string;
}

export default function ControllerdServerTextInput({
  error,
  name,
  label,
  module,
  ...props
}: ControllerdServerTextInputProps) {
  return (
    <TextInput
      key={label}
      label={label}
      placeholder={`Enter ${module && module} ${label}`}
      name={name}
      error={error}
      {...props}
    />
  );
}
