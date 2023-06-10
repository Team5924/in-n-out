import handleAdminPageProtection from "@/app/(clock-app)/handleAdminPageProtection";

export default async function Admin() {
  await handleAdminPageProtection();
  return <h1>Admin</h1>;
}
