import { Dispatch } from "react";
export const inputDataHandleChange = (
  key: string,
  value: string | number,
  set: Dispatch<any>
) => {
  set((prevData: any) => ({
    ...prevData,
    [key]: value,
  }));
};
