import Service from "../utils/class/service";
import ProductsRoutes from "./state.routes";

export class StateService extends Service {
  constructor() {
    const URL = ProductsRoutes.RESOURCE;
    const TOKEN = ProductsRoutes.RESOURCE;
    super(TOKEN, URL);
  }
}
