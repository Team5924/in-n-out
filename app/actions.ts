"use server";

import { prisma } from "@/app/client";
import { revalidatePath } from "next/cache";

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

export async function approveUser(userEmail: string) {
  await prisma.user.update({
    where: { email: userEmail },
    data: { isApproved: true },
  });
  revalidatePath("/admin");
}

export async function rejectUser(userEmail: string) {
  await prisma.user.delete({
    where: { email: userEmail },
  });
  revalidatePath("/admin");
}
