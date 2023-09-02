import handleAdminPageProtection from "@/app/(clock-app)/handleAdminPageProtection";
import {
  getNamesAndEmailsOfApprovedUsers,
  getNamesAndEmailsOfUnapprovedUsers,
} from "@/app/(clock-app)/reads";
import AccountRequestUserCard from "@/app/(clock-app)/admin/AccountRequestUserCard";
import AccountDeletionUserCard from "@/app/(clock-app)/admin/AccountDeletionUserCard";

export default async function Admin() {
  await handleAdminPageProtection();
  const namesAndEmailsOfUnapprovedUsers =
    await getNamesAndEmailsOfUnapprovedUsers();
  const namesAndEmailsOfApprovedUsers =
    await getNamesAndEmailsOfApprovedUsers();
  return (
    <div className="flex flex-col items-center">
      <h2 className="mt-9 text-5xl font-bold">Admin</h2>
      <h3 className="mt-14 text-3xl font-semibold">Account Requests</h3>
      {namesAndEmailsOfUnapprovedUsers.length === 0 ? (
        <p>No Requests</p>
      ) : (
        namesAndEmailsOfUnapprovedUsers.map((nameAndEmailOfUser, index) => (
          <AccountRequestUserCard
            key={index}
            name={nameAndEmailOfUser.name ?? ""}
            email={nameAndEmailOfUser.email ?? ""}
          ></AccountRequestUserCard>
        ))
      )}
      <h3 className="mt-14 text-3xl font-semibold">Accounts</h3>
      {namesAndEmailsOfApprovedUsers.map((nameAndEmailOfUser, index) => (
        <AccountDeletionUserCard
          key={index}
          name={nameAndEmailOfUser.name ?? ""}
          email={nameAndEmailOfUser.email ?? ""}
        ></AccountDeletionUserCard>
      ))}
    </div>
  );
}
