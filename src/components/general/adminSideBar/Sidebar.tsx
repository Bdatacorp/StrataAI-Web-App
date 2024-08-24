"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/provider/store";
import { updateSideBar } from "@/lib/provider/features/ui/ui.slice";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import ExpandedSidebar from "./expandedSidebar";
import CollapsedSidebar from "./collapsedSidebar";
import { MdGroups, MdOutlineDocumentScanner } from "react-icons/md";
import { FaLightbulb, FaParachuteBox, FaTruck } from "react-icons/fa";
import { PiFilesFill, PiNotepadFill, PiUsersThreeLight } from "react-icons/pi";
import { TbBuildingEstate, TbSettingsUp } from "react-icons/tb";
import { Modules } from "@/lib/config/modules";
import { IoChatbubblesSharp } from "react-icons/io5";
import { FaUserCheck } from "react-icons/fa6";
import { VscFeedback } from "react-icons/vsc";

interface LinkItem {
  id: number;
  icon: JSX.Element;
  link: string;
  target: string;
}

export interface Section {
  title: string;
  items: {
    id: number;
    icon: JSX.Element; // or any other appropriate type for icon
    link: string;
    target: string;
  }[];
}

export const sidebarNavLinks: Section[] = [
  {
    title: "",
    items: [
      {
        id: 1,
        icon: <TbBuildingEstate className="text-xl" />,
        link: Modules.ADMIN.STATE.name,
        target: Modules.ADMIN.STATE.route,
      },
      {
        id: 2,
        icon: <PiFilesFill className="text-xl" />,
        link: Modules.ADMIN.FILES.name,
        target: Modules.ADMIN.FILES.route,
      },
      {
        id: 3,
        icon: <PiUsersThreeLight className="text-xl" />,
        link: Modules.ADMIN.USERS.name,
        target: Modules.ADMIN.USERS.route,
      },
      {
        id: 4,
        icon: <VscFeedback className="text-xl" />,
        link: Modules.ADMIN.FEEDBACKS.name,
        target: Modules.ADMIN.FEEDBACKS.route,
      },
      {
        id: 5,
        icon: <IoChatbubblesSharp className="text-xl" />,
        link: "User Chat",
        target: "/chat",
      },
      {
        id: 6,
        icon: <FaUserCheck className="text-xl" />,
        link: "System Users",
        target: "/admin/system",
      },
    ],
  },
];

const AdminSidebar: React.FC = () => {
  const dispatch = useDispatch();
  const isSidebarExpanded = useSelector(
    (state: RootState) => state.ui.slideBarExpanded
  );

  return (
    <div
      className={`h-svh relative hidden md:hidden lg:block sidebar-transition border-r`}
      style={{ width: isSidebarExpanded ? "20%" : "10%" }}
    >
      {isSidebarExpanded ? (
        <ExpandedSidebar links={sidebarNavLinks} />
      ) : (
        <CollapsedSidebar links={sidebarNavLinks} />
      )}

      <div className=" absolute top-8 right-[-15px]">
        <div
          className="border-solid border-gray-200 border-[1px] rounded-full p-[4px] bg-white cursor-pointer hover:bg-gray-200"
          onClick={() => dispatch(updateSideBar())}
        >
          {isSidebarExpanded ? (
            <IoIosArrowBack className="text-xl" />
          ) : (
            <IoIosArrowForward className="text-xl" />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
