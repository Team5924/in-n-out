"use server";

import { prisma } from "@/app/client";

export async function toggleClockStatus(userEmail: string) {
  const user = await prisma.user.findUnique({
    where: { email: userEmail },
    include: { shifts: true },
  });

  const latestShift =
    user?.shifts.length && user?.shifts.length > 0
      ? user?.shifts.reduce((newestShift, currentShift) => {
          return currentShift.shiftStart.getTime() >
            newestShift.shiftStart.getTime()
            ? currentShift
            : newestShift;
        }, user?.shifts[0])
      : null;

  if (latestShift?.shiftEnd || !latestShift) {
    if (user) {
      await prisma.shift.create({ data: { userId: user.id } });
    }
  } else {
    await prisma.shift.update({
      data: { shiftEnd: new Date() },
      where: { id: latestShift.id },
    });
  }
}

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
    0
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
