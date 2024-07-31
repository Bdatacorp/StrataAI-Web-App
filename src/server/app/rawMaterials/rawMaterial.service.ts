import Service from "../utils/class/service";
import RawMaterialRoutes from "./rawMaterial.routes";

export class RawMaterialService extends Service {
  constructor() {
    const URL = RawMaterialRoutes.RESOURCE;
    const TOKEN = RawMaterialRoutes.RESOURCE;
    super(TOKEN, URL);
  }
}

const rawMaterialServiceInstance = new RawMaterialService();

export default rawMaterialServiceInstance;
