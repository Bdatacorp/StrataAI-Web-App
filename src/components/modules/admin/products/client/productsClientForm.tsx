"use client";

import { toast } from "react-toastify";
import ControllerdServerTextInput from "@/components/ui/server/inputs/ControllerdServerTextInput";
import ControllerdServerNumberInput from "@/components/ui/server/inputs/ControllerdServerNumberInput";
import ServerForm from "@/components/ui/server/serverForm/form";
import { useFormState } from "react-dom";
import { useEffect, useState } from "react";
import createRawMaterialAction from "@/server/actions/rawmaterials/createRawMaterialAction";
import { Button, ComboboxData, MultiSelect } from "@mantine/core";
import ControllerdServerMultiSelect from "@/components/ui/server/inputs/ControllerdServerMultiSelect";
import toastValidationMessage from "@/components/ui/client/toast/toastValidationMessage";
import { useRouter } from "next/navigation";
import { ProductFormState } from "../types";
import createProductAction from "@/server/actions/products/createProductAction";
import ControllerdServerSelect from "@/components/ui/server/inputs/ControllerdServerSelect";
import { BiPlus } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { PiPlus } from "react-icons/pi";

const initialState: ProductFormState = {
  message: "",
  status: false,
  errors: {
    title: { message: "" },
    quantity: { message: "" },
    description: { message: "" },
    raw_materials: { message: "" },
  },
  raw_materials: [],
  formData: null,
};

export default function ProductClientForm({
  selectRawMaterialsOptions,
}: {
  selectRawMaterialsOptions: ComboboxData;
}) {
  const [state, formAction] = useFormState(createProductAction, initialState);
  const [rawMaterialInput, setRawMaterialInput] = useState([
    { raw_material: "", quantity: 0 },
  ]);
  const router = useRouter();

  useEffect(() => {
    const validation = toastValidationMessage(state);
    if (validation) router.push("");
  }, [state, router]);

  const addNewRawMaterialFeild = () => {
    setRawMaterialInput([
      ...rawMaterialInput,
      { raw_material: "", quantity: 0 },
    ]);
  };

  const removeRawMaterialFeild = (index: number) => {
    const updatedMaterials = [...rawMaterialInput];
    updatedMaterials.splice(index, 1);
    setRawMaterialInput(updatedMaterials);
  };

  const handleFormSubmit = (formData: FormData) => {
    formAction({
      ...state,
      raw_materials: rawMaterialInput,
      formData: formData,
    });
  };

  return (
    <>
      <ServerForm action={handleFormSubmit}>
        <ControllerdServerTextInput
          label="Title"
          module="Product"
          name="title"
          error={state?.errors?.title?.message}
        />

        <ControllerdServerTextInput
          label="Description"
          module="Product"
          name="description"
          error={state?.errors?.description?.message}
        />

        <ControllerdServerNumberInput
          label="Quantity"
          module="Product"
          name="quantity"
          allowNegative={false}
          error={state?.errors?.quantity?.message}
        />

        <div className="flex flex-col gap-3 items-start">
          {rawMaterialInput.map((element, index) => (
            <div
              className="w-full flex gap-6 items-end justify-between"
              key={index}
            >
              <ControllerdServerSelect
                className="grow"
                label="Raw Material"
                module="Product"
                value={rawMaterialInput[index].raw_material}
                data={selectRawMaterialsOptions}
                onChange={(value) =>
                  setRawMaterialInput((prevState: any) =>
                    prevState.map((element: any, elementIndex: number) =>
                      elementIndex === index
                        ? { ...element, raw_material: value }
                        : element
                    )
                  )
                }
              />
              <ControllerdServerNumberInput
                label="Quantity"
                className="grow"
                module="Product"
                value={rawMaterialInput[index].quantity}
                onChange={(value) =>
                  setRawMaterialInput((prevState: any) =>
                    prevState.map((element: any, elementIndex: number) =>
                      elementIndex === index
                        ? { ...element, quantity: value }
                        : element
                    )
                  )
                }
                allowNegative={false}
              />
              <div className="grow">
                <Button
                  size="xs"
                  variant="light"
                  color="red"
                  leftSection={<MdDelete />}
                  onClick={() => removeRawMaterialFeild(index)}
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}

          <Button
            onClick={addNewRawMaterialFeild}
            variant="transparent"
            leftSection={<PiPlus />}
          >
            Add New Raw Material Feild
          </Button>
        </div>
      </ServerForm>
    </>
  );
}
