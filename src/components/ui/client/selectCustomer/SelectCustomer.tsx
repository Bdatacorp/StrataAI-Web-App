import React, { useState } from "react";
import { Input, Modal, Textarea } from "@mantine/core";
import { FaPlus } from "react-icons/fa";
import SearchBox from "@/components/ui/client/searchBox/SearchBox";

// CUSTOMERS DATA
const customers = [
  {
    id: 1,
    customerName: "customer 1",
    contact: "contact 1",
    address: "Lorem ipsum dolor sit amet consectetur",
  },
  {
    id: 2,
    customerName: "customer 2",
    contact: "contact 2",
    address: "Lorem ipsum dolor sit amet consectetur",
  },
  {
    id: 3,
    customerName: "customer 3",
    contact: "contact 3",
    address: "Lorem ipsum dolor sit amet consectetur",
  },
  {
    id: 4,
    customerName: "customer 4",
    contact: "contact 4",
    address: "Lorem ipsum dolor sit amet consectetur",
  },
  {
    id: 5,
    customerName: "customer 5",
    contact: "contact 5",
    address: "Lorem ipsum dolor sit amet consectetur",
  },
];

const SelectCustomer = ({
  onSelectCustomer,
}: {
  onSelectCustomer: Function;
}) => {
  const [addCustomerModalOpen, setAddCustomerModalOpen] = useState(false);

  const handleAddCustomerModalClose = () => {
    setAddCustomerModalOpen(false);
  };

  const handleCustomerSelect = (customerName: string) => {
    onSelectCustomer(customerName);
  };

  return (
    <div>
      {/* ADD BUTTON */}
      <div className="flex justify-end">
        <div
          className="flex items-center gap-1 w-fit cursor-pointer group"
          onClick={() => setAddCustomerModalOpen(true)}
        >
          <FaPlus className="text-sm text-Accent group-hover:text-Accent/80 transition-colors duration-150" />
          <div>
            <span className="text-[15px] font-[600] text-Accent group-hover:text-Accent/80">
              Add
            </span>
          </div>
        </div>
      </div>

      {/* ADD CUSTOMER MODAL */}
      <Modal
        opened={addCustomerModalOpen}
        onClose={handleAddCustomerModalClose}
        title="Add Customer"
      >
        <form className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div>
              <span className="text-[15px] font-[700]">Customer</span>
            </div>
            <div>
              <Input placeholder="Enter Customer’s Name" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div>
              <span className="text-[15px] font-[700]">Address</span>
            </div>
            <div>
              <Textarea minRows={6} placeholder="Enter the address" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div>
              <span className="text-[15px] font-[700]">Contact</span>
            </div>
            <div>
              <Input placeholder="Enter mobile Number" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div>
              <span className="text-[15px] font-[700]">Email</span>
            </div>
            <div>
              <Input placeholder="Enter the email" />
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex items-center justify-between px-6">
            {/* RESET */}
            <div className="border-Accent border-solid border-[1px] rounded-lg py-2 px-4 w-[150px] flex items-center justify-center cursor-pointer hover:bg-Accent/10">
              <span className="text-Accent text-[15px] font-[600]">Reset</span>
            </div>

            {/* ADD */}
            <div
              className="border-Accent bg-Accent hover:bg-Accent/90 border-solid border-[1px] rounded-lg py-2 px-4 flex items-center justify-center cursor-pointer w-[150px]"
              onClick={() => {
                handleAddCustomerModalClose(); // CLOSE MODAL AFTER ADDING
              }}
            >
              <span className="text-white text-[15px] font-[600]">Add</span>
            </div>
          </div>
        </form>
      </Modal>

      {/* SEARCH */}
      <div className="mt-4">
        <SearchBox />
      </div>

      {/* CUSTOMERS */}
      <div className="mt-6 flex flex-col gap-2">
        {customers.map((customer) => (
          <div
            key={customer.id}
            className="flex flex-col leading-6 px-3 py-4 cursor-pointer bg-white hover:bg-[#F4F6F8] rounded-xl"
            onClick={() => handleCustomerSelect(customer.customerName)}
          >
            {/* TITLE */}
            <div>
              <span className="text-[16px] font-[600] text-Primary">
                {customer.customerName}
              </span>
            </div>

            {/* CONTACT */}
            <div>
              <span className="text-[16px] font-[600] text-Accent">
                {customer.contact}
              </span>
            </div>

            {/* DESCRIPTION */}
            <div>
              <span className="text-[15px] font-[700] text-[#09132080]">
                {customer.address}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectCustomer;
