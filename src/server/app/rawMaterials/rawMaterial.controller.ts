import supplierServiceInstance, {
  RawMaterialService,
} from "./rawMaterial.service";
import zodErrorMessageFormatter from "../utils/pipes/zodErrorMessageFormatterPipe";
import ResponceStatus from "../utils/config/responseStatus";
import CacheTags from "../utils/config/cacheTags";
import rawMaterialServiceInstance from "./rawMaterial.service";
import { RawMaterial } from "./rawMaterial.types";
import RawMaterialsValidate from "./rawMaterial.validate";
import rawMaterialSuppliersExtractPipe from "./pipes/rawMaterialSuppliersExtractPipe";
import responseProcess from "../utils/responseProcess/responseProcess";
import rawMaterialsParseAvaragePipe from "./pipes/rawMaterialsParseAvaragePipe";

class RawMaterialController {
  private rawMaterialService: RawMaterialService;
  private responseStatus: typeof ResponceStatus;
  private tags: string[];
  constructor() {
    this.rawMaterialService = rawMaterialServiceInstance;
    this.responseStatus = ResponceStatus;
    this.tags = [CacheTags.RAW_MATERIAL];
  }

  async getAllRawMaterials(): Promise<RawMaterial[]> {
    "use server";
    const rawMaterils = await this.rawMaterialService.getAll(this.tags);

    //get supplier name
    const extracter = rawMaterialSuppliersExtractPipe(rawMaterils);

    //set avarage amount
    const parseAverage = rawMaterialsParseAvaragePipe(extracter);
    return parseAverage;
  }

  async createRawMaterials(rawMaterial: any) {
    "use server";
    try {
      const validated = RawMaterialsValidate.parse(rawMaterial);

      const res: any = await this.rawMaterialService.create(validated);

      return responseProcess(res, "Raw Materials", CacheTags.RAW_MATERIAL);
    } catch (error: any) {
      console.log(error);
      return zodErrorMessageFormatter(error);
    }
  }

  async deleteRawMaterials(id: string) {
    "use server";
    try {
      if (!id) return false;

      const res: any = await this.rawMaterialService.delete(id);

      return await responseProcess(
        res,
        "Raw Materials",
        CacheTags.RAW_MATERIAL,
        "deleted"
      );
    } catch (error: any) {
      console.log(error);
      return zodErrorMessageFormatter(error);
    }
  }
}

const rawMaterialController = new RawMaterialController();

export default rawMaterialController;
