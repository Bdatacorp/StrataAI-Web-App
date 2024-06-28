import { Routes } from "@/lib/config/routes";
import { UnknownAction } from "@reduxjs/toolkit";
import { ReactNode } from "react";
import { IconType } from "react-icons";
import { UrlObject } from "url";
type Url = string | UrlObject;

export type NavbarLinkType = {
  label: string;
  Icon: IconType;
  link?: Routes | Url;
  action?: () => UnknownAction;
};
