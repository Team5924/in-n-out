import handleAdminPageProtection from "@/app/(clock-app)/handleAdminPageProtection";
import AccountRequestUserCard from "@/app/(clock-app)/admin/AccountRequestUserCard";
import { getNamesAndEmailsOfUnapprovedUsers } from "@/app/(clock-app)/reads";

export default async function Admin() {
  await handleAdminPageProtection();
  const namesAndEmailsOfUnapprovedUsers =
    await getNamesAndEmailsOfUnapprovedUsers();
  return (
    <div className="flex flex-col items-center">
      <h2 className="mb-14 mt-9 text-5xl font-bold">Admin</h2>
      <h3 className="mb-3 text-2xl font-semibold">Account Requests</h3>
      {namesAndEmailsOfUnapprovedUsers.map((nameAndEmailOfUser, index) => (
        <AccountRequestUserCard
          key={index}
          name={nameAndEmailOfUser.name ?? ""}
          email={nameAndEmailOfUser.email ?? ""}
        ></AccountRequestUserCard>
      ))}
    </div>
  );
}
