import { PiArrowBendUpLeftBold } from "react-icons/pi";
import ReturnButton from "@/components/ui/client/returnButton/returnButton";
import ProductsServerForm from "@/components/modules/admin/products/server/productsServerForm";

const Products = () => {
  return (
    <>
      {/* CONTENT */}
      <div>
        {/* TOP */}
        <div className="flex md:flex-row flex-col md:items-center md:justify-between">
          <div className="flex flex-col gap-1">
            {/* TITLE */}
            <div>
              <h1 className="md:text-[30px] text-[25px] font-[600]">
                Add a new Product
              </h1>
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
                <span className="text-[15px] font-[400]">Products</span>
              </div>
              <div>
                <span>/</span>
              </div>
              <div>
                <span className="text-[15px] font-[700]">New product</span>
              </div>
            </div>
          </div>

          {/* Return Button*/}
          <ReturnButton label="Return To Products" />
        </div>

        {/* INPUTS */}
        <div className="flex mt-8">
          <div className="md:flex-[5] w-full">
            <ProductsServerForm />
          </div>

          {/* SPACE */}
          <div className="md:flex-[1] md:block hidden"></div>
        </div>
      </div>
    </>
  );
};

export default Products;
