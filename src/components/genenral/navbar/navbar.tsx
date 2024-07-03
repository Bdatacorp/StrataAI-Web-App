import Link from "next/link";
import module from "./navbar.module.css";
import { ActionIcon, Tooltip } from "@mantine/core";
import NavBarLinks from "./navbarLinks";
import { useDispatch } from "react-redux";
import { NavBarLinkTypes } from "./type";

export default function Navbar() {
  return (
    <div
      className={` flex flex-col pt-5 gap-5 items-center px-4 bg-slate-800 h-full ${module.navbarBg}`}
    >
      {NavBarLinks.map(({ Icon, label, link, type, Element }, index) => (
        <Tooltip label={label} position="right" key={index}>
          <ActionIcon variant="transparent">
            {link && (
              <Link href={link}>
                {Icon && <Icon className="text-[30px] text-white" />}
              </Link>
            )}
          {Element && type === NavBarLinkTypes.action && <Element />}
          </ActionIcon>
        </Tooltip>
      ))}
    </div>
  );
}
