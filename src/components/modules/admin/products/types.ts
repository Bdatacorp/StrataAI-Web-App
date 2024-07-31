export type ProductFormErrors = {
  title: { message: string };
  quantity: { message: string };
  description: { message: string };
  raw_materials: { message: string };
};

export type ProductFormState = {
  message: string;
  status: boolean;
  errors: ProductFormErrors;
  raw_materials: { raw_material: string; quantity: number }[];
  formData: FormData | null;
};
