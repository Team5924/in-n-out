import handleAdminPageProtection from "@/app/(clock-app)/handleAdminPageProtection";
import SignInTerminal from "@/app/(clock-app)/terminal/SignInTerminal";

export default async function Terminal() {
  const session = await handleAdminPageProtection();
  return <SignInTerminal />;
}
