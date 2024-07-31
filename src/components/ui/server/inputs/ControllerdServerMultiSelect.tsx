import {
  MultiSelect,
  MultiSelectProps,
  NumberInput,
  NumberInputProps,
  TextInput,
  TextInputProps,
} from "@mantine/core";
import React, { Dispatch } from "react";
import { inputDataHandleChange } from "../../client/clientForms/inputOnChnageFunctions";

export interface ControllerdServerMultiSelectProps extends MultiSelectProps {
  error: string;
  label: string;
  name: string;
  module?: string;
}

export default function ControllerdServerMultiSelect({
  error,
  name,
  label,
  module,
  ...props
}: ControllerdServerMultiSelectProps) {
  return (
    <MultiSelect
      key={label}
      label={label}
      placeholder={`Select ${label}`}
      error={error}
      name={name}
      searchable
      nothingFoundMessage="Nothing found..."
      {...props}
    />
  );
}
