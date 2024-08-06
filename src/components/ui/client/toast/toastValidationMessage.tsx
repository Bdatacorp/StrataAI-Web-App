import { useRouter } from "next/router";
import { toast } from "react-toastify";

export default function toastValidationMessage(state: any) {
  if (state?.status === true) {
    toast.success(state?.message);
    return true;
  } else if (state?.status === false) {
    if (state?.message) {
      toast.error(state?.message);
    } else {
      for (const key in state?.errors) {
        if (state?.errors[key].message) {
          toast.error(state?.errors[key].message);
          break;
        }
      }
    }
  }
}
