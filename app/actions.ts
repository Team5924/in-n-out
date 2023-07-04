"use server";

import { prisma } from "@/app/client";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export async function toggleClockStatus(userEmail: string) {
  const session = await getServerSession(authOptions);
  const userCallingEmail = session?.user?.email ?? "";
  const userCalling = await prisma.user.findUnique({
    where: { email: userCallingEmail },
  });
  if (userCalling?.isAdmin) {
    const userToToggleClock = await prisma.user.findUnique({
      where: { email: userEmail },
      include: { shifts: true },
    });

    const latestShift =
      userToToggleClock?.shifts.length && userToToggleClock?.shifts.length > 0
        ? userToToggleClock?.shifts.reduce((newestShift, currentShift) => {
            return currentShift.shiftStart.getTime() >
              newestShift.shiftStart.getTime()
              ? currentShift
              : newestShift;
          }, userToToggleClock?.shifts[0])
        : null;

    if (latestShift?.shiftEnd || !latestShift) {
      if (userToToggleClock) {
        await prisma.shift.create({ data: { userId: userToToggleClock.id } });
      }
    } else {
      await prisma.shift.update({
        data: { shiftEnd: new Date() },
        where: { id: latestShift.id },
      });
    }
  }
}

export async function approveUser(userEmail: string) {
  const session = await getServerSession(authOptions);
  const userCallingEmail = session?.user?.email ?? "";
  const userCalling = await prisma.user.findUnique({
    where: { email: userCallingEmail },
  });
  if (userCalling?.isAdmin) {
    await prisma.user.update({
      where: { email: userEmail },
      data: { isApproved: true },
    });
    revalidatePath("/admin");
  }
}

export async function rejectUser(userEmail: string) {
  const session = await getServerSession(authOptions);
  const userCallingEmail = session?.user?.email ?? "";
  const userCalling = await prisma.user.findUnique({
    where: { email: userCallingEmail },
  });
  if (userCalling?.isAdmin) {
    await prisma.user.delete({
      where: { email: userEmail },
    });
    revalidatePath("/admin");
  }
}
