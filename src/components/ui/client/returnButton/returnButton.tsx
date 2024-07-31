"use client";
import { useRouter } from "next/navigation";
import { PiArrowBendUpLeftBold } from "react-icons/pi";

export default function ReturnButton({ label }: { label: string }) {
  const router = useRouter();
  return (
    <div
      className="flex items-center gap-2 w-fit cursor-pointer group"
      onClick={() => router.back()}
    >
      <div>
        <PiArrowBendUpLeftBold className="text-balance group-hover:text-Primary/80" />
      </div>
      <div>
        <span className="text-[15px] font-[500] text-Primary group-hover:text-Primary/80">
          {label}
        </span>
      </div>
    </div>
  );
}
