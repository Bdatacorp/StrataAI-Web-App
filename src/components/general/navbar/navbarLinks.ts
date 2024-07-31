import { NavbarLinkType, NavBarLinkTypes } from "./type";
import { Routes } from "@/lib/config/routes";
import { PiFilePdfFill } from "react-icons/pi";
import {
  IoChatbubbleEllipsesOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import PDFNavlink from './pdfNavlink';


const NavBarLinks: NavbarLinkType[] = [
  {
    label: "Conversations",
    Icon: IoChatbubbleEllipsesOutline,
    link: Routes.CHAT,
  },
  {
    label: "Show PDF",
    Element: PDFNavlink,
    type: NavBarLinkTypes.action,
  },
  {
    label: "Settings",
    Icon: IoSettingsOutline,
    link: Routes.SETTINGS,
  },
];

export default NavBarLinks;
