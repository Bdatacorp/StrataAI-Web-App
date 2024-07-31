import React from "react";
import { PiArrowBendUpRightLight } from "react-icons/pi";

interface enrolledProductTypes {
  id: number;
  title: string;
  desc: string;
}

const EnrolledRawMaterialCard = ({
  product,
}: {
  product: enrolledProductTypes;
}) => {
  return (
    <div className="py-[12px] px-[10px] flex flex-col gap-2 w-full h-fit hover:bg-[#F4F6F8] rounded-xl">
      {/* TITLE */}
      <div>
        <span className="font-[700] text-[15px] text-Primary">
          {product.title}
        </span>
      </div>

      {/* DESCRIPTION */}
      <div>
        <p className="font-[700] text-[15px] text-[#09132080]">
          {product.desc}
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

export default EnrolledRawMaterialCard;
