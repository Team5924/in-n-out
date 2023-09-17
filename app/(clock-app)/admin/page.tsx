import {
  getNamesAndEmailsOfApprovedUsers,
  getNamesAndEmailsOfUnapprovedUsers,
} from "@/app/(clock-app)/reads";
import AccountRequestUserCard from "@/app/(clock-app)/admin/AccountRequestUserCard";
import AccountDeletionUserCard from "@/app/(clock-app)/admin/AccountDeletionUserCard";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { prisma } from "@/app/client";
import { redirect } from "next/navigation";

export default async function Admin() {
  const session = await getServerSession(authOptions);
  const { isAdmin, isTerminal, isApproved, schoolId } =
    (await prisma.user.findUnique({
      where: { email: session?.user?.email ?? "" },
      select: {
        isAdmin: true,
        isTerminal: true,
        isApproved: true,
        schoolId: true,
      },
    })) ?? {};

  const namesAndEmailsOfUnapprovedUsers =
    await getNamesAndEmailsOfUnapprovedUsers();
  const namesAndEmailsOfApprovedUsers =
    await getNamesAndEmailsOfApprovedUsers();

  // Admins can access
  // Else permission denied
  if (isAdmin) {
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
  } else {
    redirect("/permission-denied");
  }
}
