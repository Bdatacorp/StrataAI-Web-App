import React from "react";
import { PiArrowBendUpRightLight } from "react-icons/pi";

interface supplierTypes {
  id: number;
  title: string;
  contact: string;
  desc: string;
}

const SuppliersCard = ({ supplier }: { supplier: supplierTypes }) => {
  return (
    <div className="py-[12px] px-[10px] flex flex-col gap-2 w-full h-fit hover:bg-[#F4F6F8] rounded-xl">
      {/* TITLE */}
      <div>
        <span className="font-[700] text-[15px] text-Primary">
          {supplier.title}
        </span>
      </div>

      {/* SUPPLIERS */}
      <div>
        <span className="font-[700] text-[15px] text-Accent">
          {supplier.contact}
        </span>
      </div>

      {/* DESCRIPTION */}
      <div>
        <p className="font-[700] text-[15px] text-[#09132080]">
          {supplier.desc}
        </p>
      </div>

      {/* VIEW BUTTON */}
      <div className="flex items-center gap-2 w-fit cursor-pointer  group">
        <PiArrowBendUpRightLight className="text-balance text-Accent group-hover:text-Accent/80" />
        <span className="font-[600] text-[12px] text-Accent group-hover:text-Accent/80">
          View
        </span>
      </div>
    </div>
  );
};

export default SuppliersCard;
