import Service from "../utils/class/service";
import ProductsRoutes from "./products.routes";

export class ProductService extends Service {
  constructor() {
    const URL = ProductsRoutes.RESOURCE;
    const TOKEN = ProductsRoutes.RESOURCE;
    super(TOKEN, URL);
  }
}

const productServiceInstance = new ProductService();

export default productServiceInstance;
