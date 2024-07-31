import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { Modal } from "@mantine/core";
import SupplierItem from "./supplierItem/SupplierItem";
import SearchBox from "@/components/ui/client/searchBox/SearchBox";

interface SupplierTypes {
  _id: string;
  name: string;
  contact: number;
  description: string;
}

interface SelectSupplierProps {
  onSelectSupplier: (supplierId: string) => void;
  selectedSupplier: string;
}

const SelectSupplier = ({
  onSelectSupplier,
  selectedSupplier,
}: SelectSupplierProps) => {
  const [suppliersModal, setSuppliersModal] = useState(false);
  const [suppliers, setSuppliers] = useState<SupplierTypes[]>([]);
  const [availableSuppliers, setAvailableSuppliers] = useState<SupplierTypes[]>(
    []
  );

  // LOAD ALL SUPPLIERS
  const loadAllSuppliers = async () => {
    setAvailableSuppliers([]);
  };

  useEffect(() => {
    loadAllSuppliers();
  }, []);

  const addSupplier = (supplier: SupplierTypes) => {
    setSuppliers([supplier]);
    setSuppliersModal(false);
    onSelectSupplier(supplier._id);
  };

  const removeSupplier = () => {
    setSuppliers([]);
    onSelectSupplier("");
  };

  useEffect(() => {
    if (!selectedSupplier) {
      setSuppliers([]);
    }
  }, [selectedSupplier]);

  return (
    <div>
      {/* SUPPLIER ITEMS */}
      <div className="flex flex-col gap-6">
        {suppliers.map((supplier) => (
          <div key={supplier._id}>
            <SupplierItem
              _id={supplier._id}
              name={supplier.name}
              description={supplier.description}
              removeSupplier={removeSupplier}
            />
          </div>
        ))}
      </div>

      {/* AVAILABLE SUPPLIERS MODAL */}
      <Modal
        title="Suppliers"
        onClose={() => setSuppliersModal(false)}
        opened={suppliersModal}
      >
        <div>
          <SearchBox />
        </div>

        <div className="flex flex-col gap-3 mt-6">
          {availableSuppliers.map((supplier) => (
            // SUPPLIER ITEM
            <div
              key={supplier._id}
              className="flex flex-col leading-6 px-3 py-4 cursor-pointer bg-white hover:bg-[#F4F6F8] rounded-xl"
              onClick={() => addSupplier(supplier)}
            >
              {/* TITLE */}
              <div>
                <span className="text-[16px] font-[600] text-Primary">
                  {supplier.name}
                </span>
              </div>

              {/* CONTACT */}
              <div>
                <span className="text-[16px] font-[600] text-Accent">
                  {supplier.contact}
                </span>
              </div>

              {/* DESCRIPTION */}
              <div className="w-full h-[1.2em] overflow-hidden whitespace-nowrap text-ellipsis">
                <span className="text-[15px] font-[700] text-[#09132080]">
                  {supplier.description}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Modal>

      {/* ADD NEW SUPPLIER */}
      <div
        className="flex items-center gap-1 cursor-pointer w-fit group mt-4"
        onClick={() => setSuppliersModal(true)}
      >
        <div>
          <FaPlus className="text-sm text-Accent group-hover:text-Accent/80 transition-colors duration-150" />
        </div>
        <div>
          <span className="text-Accent text-[12px] font-[600] group-hover:text-Accent/80 transition-colors duration-150">
            Add Supplier
          </span>
        </div>
      </div>
    </div>
  );
};

export default SelectSupplier;
