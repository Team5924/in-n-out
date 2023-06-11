import handleAdminPageProtection from "@/app/(clock-app)/handleAdminPageProtection";
import ToggleShiftButton from "@/app/(clock-app)/terminal/ToggleShiftButton";

export default async function Terminal() {
  const session = await handleAdminPageProtection();
  return (
    <>
      <h1>Terminal</h1>
      <ToggleShiftButton userEmail={session.user?.email}></ToggleShiftButton>
    </>
  );
}
