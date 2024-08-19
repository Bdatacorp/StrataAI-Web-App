"use client";
import Header from "@/components/general/header/header";
import Image from "next/image";
import { useEffect } from "react";
import {
  FaFaceFrown,
  FaFaceFrownOpen,
  FaRegFaceFrownOpen,
} from "react-icons/fa6";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error.message);
  }, [error]);

  return (
    <main className="w-full flex h-svh flex-col gap-2 justify-start items-center py-28">
      <Image
        src="/img/strata-ai.png"
        alt="Strata AI"
        width={200}
        height={70}
      />

      <div className="grow flex flex-col justify-center items-center">
        <FaRegFaceFrownOpen className="text-3xl text-gray-400" />
        <h2 className="text-center">
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          Oops! Something went wrong.
        </h2>
        <button
          className="text-white bg-primary md:py-[6px] py-[8px] flex items-center justify-center md:px-[40px] px-[50px] rounded-lg cursor-pointer hover:bg-primary/90 relative overflow-hidden isolate w-fit mt-3"
          onClick={
            // Attempt to recover by trying to re-render the invoices route
            () => reset()
          }
        >
          Try again
        </button>
      </div>
    </main>
  );
}
