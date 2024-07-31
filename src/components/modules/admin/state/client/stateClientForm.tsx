"use client";


import ControllerdServerTextInput from "@/components/ui/server/inputs/ControllerdServerTextInput";
import ControllerdServerNumberInput from "@/components/ui/server/inputs/ControllerdServerNumberInput";
import ServerForm from "@/components/ui/server/serverForm/form";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { Button } from "@mantine/core";
import toastValidationMessage from "@/components/ui/client/toast/toastValidationMessage";
import { useRouter } from "next/navigation";
import createProductAction from "@/server/actions/products/createProductAction";
import ControllerdServerSelect from "@/components/ui/server/inputs/ControllerdServerSelect";
import { MdDelete } from "react-icons/md";
import { PiPlus } from "react-icons/pi";
import { StateFormState } from "../types";
import { Modules } from "@/lib/config/modules";

const initialState: StateFormState = {
  message: "",
  status: false,
  errors: {
    name: { message: "" },
  },
  formData: null,
};

export default function StateClientForm() {
  const [state, formAction] = useFormState(createProductAction, initialState);
  const router = useRouter();

  useEffect(() => {
    const validation = toastValidationMessage(state);
    if (validation) router.push(Modules.ADMIN.STATE.route);
  }, [state, router]);

  return (
    <>
      <ServerForm action={formAction}>
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
      </ServerForm>
    </>
  );
}
