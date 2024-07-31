import React, { useEffect, useState } from "react";
import Link from "next/link";
import { MdOutlineDocumentScanner } from "react-icons/md";
import { FaTruck, FaParachuteBox, FaLightbulb } from "react-icons/fa";
import { PiNotepadFill } from "react-icons/pi";
import { MdGroups } from "react-icons/md";
import { TbSettingsUp } from "react-icons/tb";
import { usePathname } from "next/navigation";
import { Section } from "./Sidebar";
import getMainPath from "@/utils/routes/getPath";

interface CollapsedSidebarProps {
  links: Section[];
}

const CollapsedSidebar: React.FC<CollapsedSidebarProps> = ({ links }) => {
  const [itemLinks, setItemLinks] = useState<Section["items"]>([]);
  const pathName = usePathname();

  useEffect(() => {
    setItemLinks(links.flatMap((section) => section.items));
  }, [links]);

  return (
    <div className="h-full flex flex-col px-5 2xl:px-6 py-10 justify-center gap-2">
      {itemLinks.map((link, index) => (
        <Link
          href={link.target}
          key={index}
          className={`w-full py-3 2xl:py-6 flex flex-col items-center justify-center gap-1 rounded-lg cursor-pointer text-center text-xs 2xl:text-sm ${
            pathName === link.target
              ? "bg-primary text-white hover:bg-primary/90"
              : "bg-white text-black hover:bg-primary hover:text-white"
          }`}
        >
          <div className="text-sm">{link.icon}</div>
          {link.link}
        </Link>
      ))}
    </div>
  );
};

export default CollapsedSidebar;
