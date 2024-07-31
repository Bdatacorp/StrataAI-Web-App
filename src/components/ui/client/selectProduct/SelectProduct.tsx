import React, { useState } from "react";

import { FaPlus } from "react-icons/fa6";
import ProductItem from "./ProductItem";

const SelectProduct = () => {
  const [products, setProducts] = useState([{ id: 0 }]);

  //   ADD NEW PRODUCT
  const addProduct = () => {
    const newId = products.length ? products[products.length - 1].id + 1 : 0;
    setProducts([...products, { id: newId }]);
  };

  //   REMOOVE PRODUCT
  const removeProduct = (id: number) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div>
      {/* PRODUCT ITEMS */}
      <div className="flex flex-col gap-6">
        {products.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            removeProduct={removeProduct}
          />
        ))}
      </div>

      {/* ADD RAW MATERIAL */}
      <div
        className="flex items-center gap-1 cursor-pointer w-fit group mt-4"
        onClick={addProduct}
      >
        <div>
          <FaPlus className="text-sm text-Accent group-hover:text-Accent/80 transition-colors duration-150" />
        </div>
        <div>
          <span className="text-Accent text-[12px] font-[600] group-hover:text-Accent/80 transition-colors duration-150">
            Add Product
          </span>
        </div>
      </div>
    </div>
  );
};

export default SelectProduct;
