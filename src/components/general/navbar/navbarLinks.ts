import { NavbarLinkType, NavBarLinkTypes } from "./type";
import { PiFilePdfFill } from "react-icons/pi";
import {
  IoChatbubbleEllipsesOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import PDFNavlink from './pdfNavlink';
import { Modules } from "@/lib/config/modules";


const NavBarLinks: NavbarLinkType[] = [
  {
    label: "Conversations",
    Icon: IoChatbubbleEllipsesOutline,
    link: Modules.USER.CHAT.route,
  },
  {
    label: "Show PDF",
    Element: PDFNavlink,
    type: NavBarLinkTypes.action,
  },
  {
    label: "Settings",
    Icon: IoSettingsOutline,
    link:"",
  },
];

export default NavBarLinks;
