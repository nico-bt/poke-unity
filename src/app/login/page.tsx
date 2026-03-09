import { LoginForm } from "@/components/LoginForm";
import { verifySession } from "@/lib/session";
import { redirect } from "next/navigation";

async function LoginPage() {
  const { isAdmin } = await verifySession();

  if (isAdmin) {
    redirect("/admin");
  }

  return <LoginForm />;
}

export default LoginPage;
