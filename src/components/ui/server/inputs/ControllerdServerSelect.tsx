import {
  MultiSelect,
  MultiSelectProps,
  NumberInput,
  NumberInputProps,
  Select,
  SelectProps,
  TextInput,
  TextInputProps,
} from "@mantine/core";
import React, { Dispatch } from "react";
import { inputDataHandleChange } from "../../client/clientForms/inputOnChnageFunctions";

export interface ControllerdServerMultiSelectProps extends SelectProps {
  label: string;
  module?: string;
}

export default function ControllerdServerSelect({
  label,
  module,
  ...props
}: ControllerdServerMultiSelectProps) {
  return (
    <Select
      key={label}
      label={label}
      placeholder={`Select ${label}`}
      searchable
      nothingFoundMessage="Nothing found..."
      {...props}
    />
  );
}
