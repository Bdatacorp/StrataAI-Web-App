"use client";
import React from "react";
import { DonutChart } from "@mantine/charts";
import "@mantine/charts/styles.css";
import EnrolledRawMaterialCard from "@/components/ui/client/cards/EnrolledRawMaterialCard";
import ProductSinglePageTable from "@/components/ui/client/tables/ProductSinglePageTable";
import { PiArrowBendUpLeftBold, PiExportFill } from "react-icons/pi";
import { useRouter } from "next/navigation";

// CHART DATA
const avilableStock = [
  { name: "Avilable Stock", value: 2000, color: "#72C270" },
  { name: "Remaining Stock", value: 2000, color: "#72C2704D" },
];

const usedStock = [
  { name: "Used Stock", value: 3000, color: "#F4B333" },
  { name: "Remaining Stock", value: 1000, color: "#F4B3334D" },
];

// ENROLLED RAW MATERIALS

const enrolledRawMaterials = [
  {
    id: 1,
    title: "Title1",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, repellat.",
  },

  {
    id: 2,
    title: "Title2",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, repellat.",
  },

  {
    id: 3,
    title: "Title3",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, repellat.",
  },

  {
    id: 4,
    title: "Title4",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, repellat.",
  },

  {
    id: 5,
    title: "Title5",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, repellat.",
  },
];

const ProductSinglePage = () => {
  const router = useRouter();

  return (
    <>
      {/* CONTENT */}
      <div>
        {/* TOP */}
        <div className="flex md:flex-row flex-col md:items-center md:gap-0 gap-4 md:justify-between">
          <div className="flex flex-col gap-1">
            {/* TITLE */}
            <div>
              <h1 className="md:text-[30px] text-[25px] font-[600]">Product</h1>
            </div>

            {/* NAVIGATIONS */}
            <div className="flex flex-wrap items-center gap-3">
              <div>
                <span className="text-[15px] font-[400]">Home</span>
              </div>
              <div>
                <span>/</span>
              </div>
              <div>
                <span className="text-[15px] font-[400]">Product</span>
              </div>
              <div>
                <span>/</span>
              </div>
              <div>
                <span className="text-[15px] font-[700]">View</span>
              </div>
            </div>
          </div>

          {/* RETURN */}
          <div
            className="flex items-center gap-2 w-fit cursor-pointer group"
            onClick={() => router.back()}
          >
            <div>
              <PiArrowBendUpLeftBold className="text-balance group-hover:text-Primary/80" />
            </div>
            <div>
              <span className="text-[15px] font-[500] text-Primary group-hover:text-Primary/80">
                Return to product
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6">
          {/* CHARTS */}
          <div className="flex md:flex-row flex-col items-center justify-center md:px-[30px] px-[10px] gap-8">
            <div className="md:flex-[1] flex flex-col gap-4 md:text-start text-center">
              {/* TITLE */}
              <div>
                <span className="text-[20px] font-[700] text-black">
                  Product
                </span>
              </div>
              {/* DESC */}
              <div>
                <p className="text-[15px] font-[700] text-[#09132080]">
                  The filament is the part of the bulb that produces light when
                  heated. Traditionally, this filament is made of tungsten, a
                  metal known for its high melting point and durability.
                </p>
              </div>
            </div>
            <div className="md:flex-[1] flex md:flex-row flex-col items-center gap-8">
              <div className="flex  flex-col items-center justify-center text-center">
                <div>
                  <DonutChart
                    data={avilableStock}
                    size={200}
                    thickness={15}
                    strokeWidth={0}
                  />
                </div>

                <div className="flex items-center justify-center gap-2 mt-4">
                  <div className="bg-[#72C270] w-[20px] h-[20px] rounded-full"></div>
                  <div>
                    <span className="text-[16px] font-[700]">
                      Avilable Stock
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex  flex-col items-center justify-center text-center">
                <div>
                  <DonutChart
                    data={usedStock}
                    size={200}
                    thickness={15}
                    strokeWidth={0}
                  />
                </div>

                <div className="flex items-center justify-center gap-2 mt-4">
                  <div className="bg-[#F4B333] w-[20px] h-[20px] rounded-full"></div>
                  <div>
                    <span className="text-[16px] font-[700]">Used Stock</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ENROLLED RAW MATERIALS */}
          <div className="mt-12 flex md:flex-row flex-col md:gap-4 gap-12">
            <div className="flex-[1] w-full">
              {/* TITLE */}
              <div>
                <span className="text-[16px] font-[700] text-black">
                  Enrolled Raw materials
                </span>
              </div>

              {/* ITEMS */}
              <div className="flex flex-col gap-3 mt-3 h-[500px] overflow-y-scroll visible-scrollbar">
                {enrolledRawMaterials.map((product) => (
                  <div key={product.id}>
                    <EnrolledRawMaterialCard product={product} />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-[1] w-full h-[500px] overflow-y-scroll"></div>
          </div>

          {/* TABLE */}
          <div className="mt-12 mb-4">
            {/* EXPORT */}
            <div className="flex items-center gap-2 w-fit cursor-pointer group">
              <div>
                <PiExportFill className="text-balance group-hover:text-Primary/90 text-Primary" />
              </div>
              <div>
                <span className="text-[16px] font-[600] text-Primary group-hover:text-Primary/90">
                  Export
                </span>
              </div>
            </div>
            <div>
              <ProductSinglePageTable />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductSinglePage;
