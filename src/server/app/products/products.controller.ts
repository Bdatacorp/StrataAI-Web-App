import CacheTags from "../utils/config/cacheTags";
import ResponceStatus from "../utils/config/responseStatus";
import responseProcess from "../utils/responseProcess/responseProcess";
import zodErrorMessageFormatter from "../utils/pipes/zodErrorMessageFormatterPipe";
import ProductsValidate from "./product.validate";
import productServiceInstance, { ProductService } from "./products.service";
import { Product } from "./products.types";

class ProductsController {
  private productService: ProductService;
  private responseStatus: typeof ResponceStatus;
  private tags: string[];
  constructor() {
    this.productService = productServiceInstance;
    this.responseStatus = ResponceStatus;
    this.tags = [CacheTags.PRODUCTS];
  }

  async getAllProducts(): Promise<Product[]> {
    "use server";
    const products = await this.productService.getAll(this.tags);
    // console.log(paredAvarage);

    return products;
  }

  async createProduct(Products: any) {
    "use server";
    try {
      const validated = ProductsValidate.parse(Products);

      const res: any = await this.productService.create(validated);

      return responseProcess(res, "Products", CacheTags.PRODUCTS);
    } catch (error: any) {
      console.log(error);
      return zodErrorMessageFormatter(error);
    }
  }

  async deleteProduct(id: string) {
    "use server";
    try {
      if (!id) return false;

      const res: any = await this.productService.delete(id);

      return await responseProcess(
        res,
        "Products",
        CacheTags.PRODUCTS,
        "deleted"
      );
    } catch (error: any) {
      console.log(error);
      return zodErrorMessageFormatter(error);
    }
  }
}

const productsController = new ProductsController();

export default productsController;
