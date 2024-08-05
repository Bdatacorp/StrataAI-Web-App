import Image from "next/image";
import React from "react";

export default function PageLoading({
  isFade,
  isBackgroud,
}: {
  isFade?: boolean;
  isBackgroud?: boolean;
}) {
  return (
    <div
      className={`w-full h-screen flex flex-col gap-3 justify-center items-center ${
        isBackgroud && "bg-white"
      }`}
    >
      <Image
        alt="Stratapages"
        src="/img/strata-ai.png"
        className={`${isFade ? "loaderText" : "loaderStrataAILogo"}`}
        width={250}
        height={30}
      />
      <span className="font-black text-primary loaderText">A PRODUCT BY</span>
      <Image
        alt="Stratapages"
        src="/img/stratapages.png"
        className={`mt-4 ${isFade ? "loaderText" : "loaderStratapagesLogo"}`}
        width={150}
        height={30}
      />
    </div>
  );
}
