import handleAdminPageProtection from "@/app/(clock-app)/handleAdminPageProtection";

export default async function Admin() {
  await handleAdminPageProtection();
  return (
    <div className="flex flex-col items-center">
      <h2 className="mb-14 mt-9 text-5xl font-bold">Admin</h2>
      <h3 className="text-2xl font-semibold">Account Requests</h3>
    </div>
  );
}
