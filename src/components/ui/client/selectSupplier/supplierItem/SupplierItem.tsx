import React from "react";
import { Input } from "@mantine/core";
import { RiDeleteBin6Fill } from "react-icons/ri";

interface SupplierItemTypes {
  _id: string;
  name: string;
  description: string;
  removeSupplier: (id: string) => void;
}

const SupplierItem = ({
  _id,
  name,
  description,
  removeSupplier,
}: SupplierItemTypes) => {
  return (
    <div className="flex gap-8 items-center">
      {/* TITLE */}
      <div className="flex-[3]">
        <Input placeholder="Title" value={name} readOnly />
      </div>

      {/* DESCRIPTION */}
      <div className="flex-[3]">
        <Input placeholder="Description" value={description} readOnly />
      </div>

      {/* REMOVE BUTTON */}
      <div>
        <div
          className="flex items-center gap-1 w-fit cursor-pointer group"
          onClick={() => removeSupplier(_id)}
        >
          {/* ICON */}
          <div>
            <RiDeleteBin6Fill className="text-xl text-Danger group-hover:text-Danger/80 transition-colors duration-150" />
          </div>

          {/* TEXT */}
          <div>
            <span className="text-[16px] font-[600] text-Danger group-hover:text-Danger/80 transition-colors duration-150">
              Remove
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierItem;
