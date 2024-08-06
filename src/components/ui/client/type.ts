import {
  ButtonProps as MantineButtonProps,
  MantineStyleProp,
} from "@mantine/core";
import { ReactNode } from "react";

export interface ButtonProps extends MantineButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
}
