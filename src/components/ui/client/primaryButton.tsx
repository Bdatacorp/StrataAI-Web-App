import { Button, MantineStyleProp } from "@mantine/core";
import { ReactNode, useEffect } from "react";
import { ButtonProps } from "./type";
import { useFormStatus } from "react-dom";

export default function PrimaryButton({
  children,
  className,
  variant,
  onClick,
  ...props
}: ButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      onClick={onClick}
      w={170}
      h={40}
      color="blue"
      {...props}
      loading={pending}
      loaderProps={{ type: "dots" }}
    >
      {children}
    </Button>
  );
}
