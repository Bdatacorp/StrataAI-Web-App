import { NavbarLinkType } from "./type";
import { Routes } from "@/lib/config/routes";
import { PiFilePdfFill } from "react-icons/pi";
import {
  IoChatbubbleEllipsesOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { useDispatch } from "react-redux";
import { togglePDFViewer } from "@/lib/provider/features/pdf/pdf.slice";

const NavBarLinks: NavbarLinkType[] = [
  {
    label: "Conversations",
    Icon: IoChatbubbleEllipsesOutline,
    link: Routes.CHAT,
  },
  {
    label: "Show PDF",
    Icon: PiFilePdfFill,
    action: togglePDFViewer,
  },
  {
    label: "Settings",
    Icon: IoSettingsOutline,
    link: Routes.SETTINGS,
  },
];

export default NavBarLinks;
