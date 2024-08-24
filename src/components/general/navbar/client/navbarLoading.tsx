import React from "react";
import NavbarClient from "./navbarClient";
import { NavBarContentTypeEnum } from "../type";

export default function NavbarLoading() {
  return (
    <NavbarClient
      type={NavBarContentTypeEnum.Admin}
      activeSession={""}
      sessions={[]}
      loading={true}
    />
  );
}
