import ActivityUserCard from "@/app/(clock-app)/(regular-users)/activity/ActivityUserCard";
import { prisma } from "@/app/client";
import {
  getCurrentSessionHours,
  getNamesAndEmailsOfApprovedUsers,
  isClockedIn,
} from "@/app/reads";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function Activity() {
  const session = await getServerSession(authOptions);
  const { isAdmin } =
    (await prisma.user.findUnique({
      where: { email: session?.user?.email ?? "" },
      select: {
        isAdmin: true
      },
    })) ?? {};

  const approvedUsers = await getNamesAndEmailsOfApprovedUsers();
  const overClockedInUsers: {
    name: string | null;
    email: string | null;
    currentSessionHours: number;
  }[] = [];
  const clockedInUsers: {
    name: string | null;
    email: string | null;
    currentSessionHours: number;
  }[] = [];
  const clockedOutUsers: {
    name: string | null;
    email: string | null;
  }[] = [];

  for (let user of approvedUsers) {
    if (await isClockedIn(user.email ?? "")) {
      const currentSessionHours = await getCurrentSessionHours(
        user.email ?? "",
      );
      if (currentSessionHours && currentSessionHours >= 14) {
        overClockedInUsers.push({
          name: user.name,
          email: user.email,
          currentSessionHours: currentSessionHours,
        });
      } else {
        clockedInUsers.push({
          name: user.name,
          email: user.email,
          currentSessionHours: currentSessionHours,
        });
      }
    } else {
      clockedOutUsers.push(user);
    }
  }

  overClockedInUsers.sort(
    (a, b) => a.currentSessionHours - b.currentSessionHours,
  );
  clockedInUsers.sort((a, b) => a.currentSessionHours - b.currentSessionHours);
  clockedOutUsers.sort();

  return (
    <div className="flex flex-col items-center">
      <h2 className="mb-7 mt-9 text-5xl font-bold">Activity</h2>
      {overClockedInUsers.map((user, index) => (
        <ActivityUserCard
          name={user.name ?? ""}
          clockStatus="over-clocked"
          isAdmin={isAdmin ?? false}
          key={index}
        ></ActivityUserCard>
      ))}
      {clockedInUsers.map((user, index) => (
        <ActivityUserCard
          name={user.name ?? ""}
          clockStatus="clocked-in"
          isAdmin={isAdmin ?? false}
          key={index}
        ></ActivityUserCard>
      ))}
      {clockedOutUsers.map((user, index) => (
        <ActivityUserCard
          name={user.name ?? ""}
          clockStatus="clocked-out"
          isAdmin={isAdmin ?? false}
          key={index}
        ></ActivityUserCard>
      ))}
    </div>
  );
}
