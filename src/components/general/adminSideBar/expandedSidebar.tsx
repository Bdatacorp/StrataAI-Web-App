import React from "react";
import Link from "next/link";
import { MdOutlineDocumentScanner } from "react-icons/md";
import { FaTruck, FaParachuteBox, FaLightbulb } from "react-icons/fa";
import { PiNotepadFill } from "react-icons/pi";
import { MdGroups } from "react-icons/md";
import { TbSettingsUp } from "react-icons/tb";
import { usePathname } from "next/navigation";
import Image from "next/image";
import getMainPath from "@/utils/client/routes/getPath";

interface LinkItem {
  id: number;
  icon: JSX.Element;
  link: string;
  target: string;
}

interface Section {
  title: string;
  items: LinkItem[];
}

interface ExpandedSidebarProps {
  links: Section[];
}

const ExpandedSidebar: React.FC<ExpandedSidebarProps> = ({ links }) => {
  const pathName = usePathname();

  return (
    <div className="px-4 py-5 pb-20 flex flex-col justify-between gap-10 transition-all duration-500 overflow-y-scroll w-full h-svh relative">
      <div className="flex flex-col gap-8">
        {links.map((section, index) => (
          <div key={index}>
            <div className="mt-5">
              <span className="xl:text-[13px] text-black">{section.title}</span>
            </div>
            <div className="mt-3 flex flex-col gap-2 w-full">
              {section.items.map((link, index) => (
                <Link
                  href={link.target}
                  key={index}
                  className={`flex items-center gap-4 py-2 px-4 rounded-lg overflow-hidden cursor-pointer w-full font-semibold ${
                    pathName.startsWith(link.target)
                      ? "bg-primary text-white hover:bg-primary/90"
                      : "bg-white text-black hover:bg-primary hover:text-white"
                  }`}
                >
                  {link.icon}
                  {link.link}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col text-center items-center justify-center">
        <div>
          <span className="text-[12px] font-bold">POWERED BY</span>
        </div>
        <Link
          href={process.env.NEXT_PUBLIC_SAFENAX_URL || "https://safenax.com"}
          target="_blank"
        >
          <div className="w-[100px] h-[25px] relative">
            <Image
              src="/img/safenax.png"
              fill={true}
              alt="logo"
              className="w-full h-full cursor-pointer"
            />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ExpandedSidebar;
