import { Routes } from "@/lib/config/routes";
import { redirect } from "next/navigation";

export default function IndexPage() {
  redirect(Routes.CHAT);
  return <div>Redirecting...</div>;
}
