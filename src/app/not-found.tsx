import { AspectRatio, Image, Text } from "@mantine/core";

export default function NotFound() {
  return (
    <div className="flex w-full h-svh lg:p-12 justify-center items-center">
      <Image h={400} alt="Strata Login Bg" src={"/img/404.jpg"} />
    </div>
  );
}
