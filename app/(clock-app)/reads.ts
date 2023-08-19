import { prisma } from "@/app/client";

type User = {
  name: string;
  clockedIn: boolean;
};

export async function getHours(userEmail: string) {
  const user = await prisma.user.findUnique({
    where: { email: userEmail },
    include: { shifts: true },
  });

  const millisecondsClocked = user?.shifts.reduce(
    (accumulatedMilliseconds, shift) => {
      if (shift.shiftEnd) {
        return (
          accumulatedMilliseconds +
          shift.shiftEnd.getTime() -
          shift.shiftStart.getTime()
        );
      } else {
        return (
          accumulatedMilliseconds + Date.now() - shift.shiftStart.getTime()
        );
      }
    },
    0,
  );

  if (millisecondsClocked) {
    const hoursClocked = millisecondsClocked / 1000 / 60 / 60;
    return parseFloat(hoursClocked.toFixed(1));
  } else {
    return 0;
  }
}

export async function isClockedIn(userEmail: string) {
  const user = await prisma.user.findUnique({
    where: { email: userEmail },
    include: { shifts: true },
  });

  for (const shift of user?.shifts ?? []) {
    if (shift.shiftEnd === null) {
      return true;
    }
  }

  return false;
}

export async function getNamesAndEmailsOfAllUsers() {
  return prisma.user.findMany({ select: { email: true, name: true } });
}

export async function getNamesOfClockedInAndOutUsers() {
  const users = await getNamesAndEmailsOfAllUsers();
  const namesOfClockedInUsers: User[] = [];
  const namesOfClockedOutUsers: User[] = [];
  for (const user of users) {
    if (user.email) {
      const userClockedIn = await isClockedIn(user.email);
      if (userClockedIn) {
        if (user.name) {
          namesOfClockedInUsers.push({ name: user.name, clockedIn: true });
        } else {
          namesOfClockedInUsers.push({ name: user.email, clockedIn: true });
        }
      } else {
        if (user.name) {
          namesOfClockedOutUsers.push({ name: user.name, clockedIn: false });
        } else {
          namesOfClockedOutUsers.push({ name: user.email, clockedIn: false });
        }
      }
    }
  }

  return [...namesOfClockedInUsers.sort(), ...namesOfClockedOutUsers.sort()];
}

export async function getNamesAndEmailsOfUnapprovedUsers() {
  return prisma.user.findMany({
    select: { email: true, name: true },
    where: { isApproved: false },
  });
}
