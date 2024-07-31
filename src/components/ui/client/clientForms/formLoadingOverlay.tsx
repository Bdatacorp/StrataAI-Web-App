import { LoadingOverlay } from "@mantine/core";
import Colors from "../../../../../colorsSchema";

export default function FormLoadingOverlay({ loading }: { loading: boolean }) {
  return (
    <LoadingOverlay
      visible={loading}
      zIndex={1000}
      overlayProps={{ radius: "sm", blur: 0.3 }}
      loaderProps={{ color: Colors.Primary, type: "bars" }}
    />
  );
}
