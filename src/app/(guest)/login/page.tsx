import LoginForm from "@/components/modules/login/loginForm";
import { Modules } from "@/lib/config/modules";
import { auth } from "@/utils/helper/auth";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: Modules.AUTH.LOGIN.title,
  description: Modules.AUTH.LOGIN.description,
};

const LoginPage = async () => {
  const session = await auth();

  if (session?.user.token) {
    redirect(Modules.ADMIN.STATE.route);
  } else {
    return <LoginForm />;
  }
};

export default LoginPage;
