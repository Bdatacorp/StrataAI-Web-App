import { Button } from "@mantine/core";
import VerificationInput from "react-verification-input";

export default function VerificationBox() {
  return (
    <div className="w-full flex flex-col items-center gap-4">
      <VerificationInput />
      <div className="grid grid-flow-col">
        <Button className="grid">Verify</Button>
        <Button className="w-full">Verify</Button>
      </div>
    </div>
  );
}
