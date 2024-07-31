import LoginForm from "@/components/modules/login/loginForm";
import { Modules } from "@/lib/config/modules";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: Modules.AUTH.LOGIN.title,
  description: Modules.AUTH.LOGIN.description,
};

const LoginPage = () => {
  return <LoginForm />;
};

export default LoginPage;
