
import { Modules } from "@/lib/config/modules";
import { redirect } from "next/navigation";

export default function IndexPage() {
  redirect(Modules.USER.CHAT.route);
  return <div>Redirecting...</div>;
}
