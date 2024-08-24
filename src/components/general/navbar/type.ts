import { IconType } from "react-icons";
import { UrlObject } from "url";
type Url = string | UrlObject;

export enum NavBarLinkTypes {
  link = "link",
  action = "action",
}

export type NavbarLinkType = {
  label: string;
  type?: NavBarLinkTypes;
  Icon?: IconType;
  Element?: any;
  link?: string | Url;
};

export enum NavBarContentTypeEnum {
  Admin = "Admin",
  Public = "Public",
}
