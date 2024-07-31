import React from "react";
import { MdOutlineSearch } from "react-icons/md";

const SearchBox = () => {
  return (
    <div className="flex items-center justify-between px-[10px] py-[7px] md:rounded-lg border-solid md:border-[1px] border-b-[1px] border-[#A5A3A3]">
      <input
        type="text"
        className="bg-transparent placeholder:text-[#A5A3A3] text-black xl:text-[13px] border-none outline-none w-full"
        placeholder="Search"
      />
      <MdOutlineSearch className="text-xl text-[#A5A3A3]" />
    </div>
  );
};

export default SearchBox;
