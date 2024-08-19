"use client";
import React from "react";
import PageLoading from "./pageLoading";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/provider/store";

export default function AbsoluteLoading() {
  const isNewUser = useSelector((state: RootState) => state.user.isNewUser);
  return (
    <>
      {isNewUser && (
        <div className="absolute w-full h-svh z-[1000]">
          <PageLoading isBackgroud />
        </div>
      )}
    </>
  );
}
