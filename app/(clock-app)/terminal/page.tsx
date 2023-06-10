import handleAdminPageProtection from "@/app/(clock-app)/handleAdminPageProtection";

export default async function Terminal() {
  await handleAdminPageProtection();
  return <h1>Terminal</h1>;
}
