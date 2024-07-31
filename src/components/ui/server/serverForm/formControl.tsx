"use client";
import DangerButton from "../../client/buttons/dangerButton";
import { GrPowerReset } from "react-icons/gr";
import PrimaryButton from "../../client/buttons/primaryButton";
import { BiSave } from "react-icons/bi";
import { useFormStatus } from "react-dom";

export default function FormControl() {
  const { pending } = useFormStatus();
  return (
    <>
      <DangerButton leftSection={<GrPowerReset />}>Reset</DangerButton>
      <PrimaryButton disabled={pending} type="submit" leftSection={<BiSave />}>
        Save
      </PrimaryButton>
    </>
  );
}
