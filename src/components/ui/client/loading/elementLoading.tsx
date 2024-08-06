import { Colors } from "@/lib/config/colors";
import { LoadingOverlay } from "@mantine/core";

export default function ElementLoading() {
  return (
    <div className="w-full relative h-full flex justify-center items-center">
      <LoadingOverlay
        visible={true}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
        loaderProps={{ color: Colors.primary }}
      />
    </div>
  );
}
