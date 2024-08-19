"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaLightbulb, FaParachuteBox, FaTruck } from "react-icons/fa";
import { MdGroups, MdOutlineDocumentScanner } from "react-icons/md";
import { PiNotepadFill } from "react-icons/pi";
import { TbSettingsUp } from "react-icons/tb";
import { sidebarNavLinks } from "./Sidebar";

const MobileSidebar = () => {
  const pathName = usePathname();

  return (
    <div className="h-[85svh] flex flex-col justify-between gap-8 w-full">
      {/* LINKS */}
      <div className="flex flex-col gap-2 mt-3">
        {sidebarNavLinks[0].items.map((item) => (
          <Link
            href={item.target}
            key={item.id}
            className={`flex items-center gap-2 py-[7px] px-[15px]  ${
              pathName.startsWith(item.target)
                ? "bg-primary text-white hover:bg-primary/90 rounded-lg"
                : "text-Primary rounded-lg hover:bg-gray-200 bg-white"
            }`}
          >
            <div>{item.icon}</div>
            <div>
              <span className="text-[14px] font-[700]">{item.link}</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Footer */}
      <div className="flex flex-col text-center items-center justify-center">
        <div>
          <span className="text-[12px] font-[600]">POWERED BY</span>
        </div>
        <div className="w-[100px] h-[25px] relative">
          <Image
            src={"/img/safenax.png"}
            fill={true}
            alt="logo"
            className="w-full h-full cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default MobileSidebar;
