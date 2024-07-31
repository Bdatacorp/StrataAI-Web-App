import React, { useState } from "react";
import { Input } from "@mantine/core";
import { NumberInput } from "@mantine/core";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { Modal } from "@mantine/core";
import SearchBox from "@/components/ui/client/searchBox/SearchBox";

interface rawMaterialItemTypes {
  id: number;
  removeRawMaterial: Function;
}

interface materialItem {
  id: number;
  title: string;
  desc: string;
}

const RawMaterialItem = ({ id, removeRawMaterial }: rawMaterialItemTypes) => {
  //   CONTROL MODAL OPEN CLOSE
  const [titleModalOpen, setTitleModalOpen] = useState(false);

  // TITLES DEMO
  const materialItems = [
    {
      id: 1,
      title: "Title 1",
      desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consectetur, illo?",
    },

    {
      id: 2,
      title: "Title 2",
      desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consectetur, illo?",
    },

    {
      id: 3,
      title: "Title 3",
      desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consectetur, illo?",
    },

    {
      id: 4,
      title: "Title 4",
      desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consectetur, illo?",
    },

    {
      id: 5,
      title: "Title 5",
      desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consectetur, illo?",
    },

    {
      id: 6,
      title: "Title 6",
      desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consectetur, illo?",
    },
  ];

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const setDataHandler = (materialItem: materialItem) => {
    setTitle(materialItem.title);
    setDescription(materialItem.desc);
    setTitleModalOpen(false);
  };

  return (
    <div className="flex gap-8 items-center">
      {/* TITLE */}
      <div className="flex-[3]">
        <Modal
          title="Raw Materials"
          opened={titleModalOpen}
          onClose={() => setTitleModalOpen(false)}
        >
          {/* SEARCH BOX */}
          <div>
            <SearchBox />
          </div>

          {/* TITLES */}
          <div className="flex flex-col gap-3 mt-6">
            {materialItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col leading-5 px-3 py-4 cursor-pointer bg-white hover:bg-[#F4F6F8] rounded-xl"
                onClick={() => setDataHandler(item)}
              >
                {/* TITLE */}
                <div>
                  <span className="text-[16px] font-[600] text-Primary">
                    {item.title}
                  </span>
                </div>

                {/* DESCRIPTION */}
                <div>
                  <p className="text-[15px] font-[700] text-[#09132080]">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Modal>

        <Input
          placeholder="Title"
          pointer
          onClick={() => setTitleModalOpen(true)}
          value={title}
        />
      </div>

      {/* DESCRIPTION */}
      <div className="flex-[3]">
        <Input placeholder="Description" disabled pointer value={description} />
      </div>

      {/* QUANTITY */}
      <div className="flex-[1]">
        <NumberInput placeholder="Quantity" />
      </div>

      {/* REMOVE BUTTON */}
      <div>
        <div
          className="flex items-center gap-1 w-fit cursor-pointer group"
          onClick={() => removeRawMaterial(id)}
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

export default RawMaterialItem;
