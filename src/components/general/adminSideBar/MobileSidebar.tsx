"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaLightbulb, FaParachuteBox, FaTruck } from "react-icons/fa";
import { MdGroups, MdOutlineDocumentScanner } from "react-icons/md";
import { PiNotepadFill } from "react-icons/pi";
import { TbSettingsUp } from "react-icons/tb";

const MobileSidebar = () => {
  const pathName = usePathname();

  const inventory = [
    {
      id: 1,
      icon: <MdOutlineDocumentScanner className="text-xl" />,
      link: "Raw Materials",
      target: "",
    },
    {
      id: 2,
      icon: <FaTruck className="text-xl" />,
      link: "Suppliers",
      target: "",
    },
    {
      id: 3,
      icon: <FaParachuteBox className="text-xl" />,
      link: "Supply",
      target: "",
    },
    {
      id: 4,
      icon: <FaLightbulb className="text-xl" />,
      link: "Products",
      target: "",
    },
  ];

  const billing = [
    {
      id: 1,
      icon: <PiNotepadFill className="text-xl" />,
      link: "Order",
      target: "",
    },
  ];

  // MANAGEMENT LINKS
  const management = [
    {
      id: 1,
      icon: <MdGroups className="text-xl" />,
      link: "Users",
      target: "",
    },
    {
      id: 2,
      icon: <TbSettingsUp className="text-xl" />,
      link: "Actions",
      target: "",
    },
  ];

  return (
    <div className="flex flex-col justify-between gap-8 w-full h-full">
      {/* LINKS */}
      <div className="flex flex-col gap-5">
        {/* INVENTORY */}
        <div>
          {/* TITLE */}
          <div>
            <span className="Inter text-[13px] text-[#09132080] font-[700]">
              INVENTORY
            </span>
          </div>

          {/* LINK ITEMS */}
          <div className="flex flex-col gap-2 mt-3">
            {inventory.map((item) => (
              <Link
                href={item.target}
                key={item.id}
                className={`flex items-center gap-2 py-[7px] px-[15px]  ${
                  pathName === item.target
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
        </div>

        {/* BILLING */}
        <div>
          {/* TITLE */}
          <div>
            <span className="Inter text-[13px] text-[#09132080] font-[700]">
              BILLING
            </span>
          </div>

          {/* LINK ITEMS */}
          <div className="flex flex-col gap-2 mt-3">
            {billing.map((item) => (
              <Link
                href={item.target}
                key={item.id}
                className={`flex items-center gap-2 py-[7px] px-[15px]  ${
                  pathName === item.target
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
        </div>

        {/* MANAGEMENT */}
        <div>
          {/* TITLE */}
          <div>
            <span className="Inter text-[13px] text-[#09132080] font-[700]">
              MANAGEMENT
            </span>
          </div>

          {/* LINK ITEMS */}
          <div className="flex flex-col gap-2 mt-3">
            {management.map((item) => (
              <Link
                href={item.target}
                key={item.id}
                className={`flex items-center gap-2 py-[7px] px-[15px]  ${
                  pathName === item.target
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
        </div>
      </div>

      {/* UPGRADE */}
      <div className="flex flex-col items-center justify-center gap-2 ">
        <div>
          <div className="relative w-[45px] h-[45px] rounded-full">
            <Image src={"/img/profile.svg"} alt="profile" fill={true} />
          </div>
        </div>

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

        <div className="flex items-center ">
          <div className="text-white bg-primary py-2 px-4 rounded-lg text-[13px] cursor-pointer hover:bg-primary/90">
            <span>Upgrade to pro</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileSidebar;
