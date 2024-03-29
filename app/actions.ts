"use server";

import { prisma } from "@/app/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { revalidatePath } from "next/cache";

export async function clockIn(userEmail: string) {
  const session = await getServerSession(authOptions);
  const userCallingEmail = session?.user?.email ?? "";
  const userCalling = await prisma.user.findUnique({
    where: { email: userCallingEmail },
  });
  if (userCalling?.isTerminal) {
    const userToClockIn = await prisma.user.findUnique({
      where: { email: userEmail },
      include: { shifts: true },
    });

    if (userToClockIn) {
      await prisma.shift.create({ data: { userId: userToClockIn.id } });
    }
  }
}

export async function clockOut(userEmail: string) {
  const session = await getServerSession(authOptions);
  const userCallingEmail = session?.user?.email ?? "";
  const userCalling = await prisma.user.findUnique({
    where: { email: userCallingEmail },
  });
  if (userCalling?.isTerminal) {
    const userToClockOut = await prisma.user.findUnique({
      where: { email: userEmail },
      include: { shifts: true },
    });

    const latestShift =
      userToClockOut?.shifts.length && userToClockOut?.shifts.length > 0
        ? userToClockOut?.shifts.reduce(
            (newestShift, currentShift) => {
              return currentShift.shiftStart.getTime() >
                newestShift.shiftStart.getTime()
                ? currentShift
                : newestShift;
            },
            userToClockOut?.shifts[0],
          )
        : null;
    if (latestShift) {
      await prisma.shift.update({
        data: { shiftEnd: new Date() },
        where: { id: latestShift.id },
      });
    }
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

export async function deleteUser(userEmail: string) {
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

export async function setUserSchoolId(schoolId: number) {
  const session = await getServerSession(authOptions);
  if (session) {
    const userCallingEmail = session?.user?.email ?? "";
    await prisma.user.update({
      where: { email: userCallingEmail },
      data: { schoolId: schoolId },
    });
  }
}

export async function getUserNameAndEmailBySchoolId(schoolId: number) {
  const session = await getServerSession(authOptions);
  const userCallingEmail = session?.user?.email ?? "";
  const userCalling = await prisma.user.findUnique({
    where: { email: userCallingEmail },
  });
  if (userCalling?.isAdmin || userCalling?.isTerminal) {
    return (
      (await prisma.user.findUnique({
        where: { schoolId: schoolId },
        select: { name: true, email: true },
      })) ?? { name: "", email: "" }
    );
  }
}
