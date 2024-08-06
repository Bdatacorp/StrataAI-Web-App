import { Button, MantineStyleProp } from "@mantine/core";
import { ReactNode } from "react";
import { ButtonProps } from "./type";

export default function DangerButton({
  children,
  className,
  variant,
  ...props
}: ButtonProps) {
  return (
    <Button w={170} h={40} variant="light" color="red" {...props}>
      {children}
    </Button>
  );
}
