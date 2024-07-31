import React, { useState } from "react";
import RawMaterialItem from "./rawMaterialItem/RawMaterialItem";
import { FaPlus } from "react-icons/fa6";

const SelectRawMaterials = () => {
  const [rawMaterials, setRawMaterials] = useState([{ id: 0 }]);

  //   ADD NEW RAW MATERIAL
  const addRawMaterial = () => {
    const newId = rawMaterials.length
      ? rawMaterials[rawMaterials.length - 1].id + 1
      : 0;
    setRawMaterials([...rawMaterials, { id: newId }]);
  };

  //   REMOOVE RAW MATERIAL
  const removeRawMaterial = (id: number) => {
    setRawMaterials(rawMaterials.filter((material) => material.id !== id));
  };

  return (
    <div>
      {/* RAW MATERIAL ITEMS */}
      <div className="flex flex-col gap-6">
        {rawMaterials.map((material) => (
          <RawMaterialItem
            key={material.id}
            id={material.id}
            removeRawMaterial={removeRawMaterial}
          />
        ))}
      </div>

      {/* ADD RAW MATERIAL */}
      <div
        className="flex items-center gap-1 cursor-pointer w-fit group mt-4"
        onClick={addRawMaterial}
      >
        <div>
          <FaPlus className="text-sm text-Accent group-hover:text-Accent/80 transition-colors duration-150" />
        </div>
        <div>
          <span className="text-Accent text-[12px] font-[600] group-hover:text-Accent/80 transition-colors duration-150">
            Add Raw Material
          </span>
        </div>
      </div>
    </div>
  );
};

export default SelectRawMaterials;
