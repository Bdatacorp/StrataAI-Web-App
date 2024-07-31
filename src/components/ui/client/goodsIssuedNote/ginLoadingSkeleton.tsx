import { Box, LoadingOverlay } from "@mantine/core";

export default function GinLoadingSkeleton() {
  return (
    <Box pos="relative" className="w-full h-[70vh]">
      <LoadingOverlay
        visible={true}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
        loaderProps={{ color: "dark", type: "bars" }}
      />
    </Box>
  );
}
