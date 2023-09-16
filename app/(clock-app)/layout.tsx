import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import NavBar from "@/app/components/NavBar";
import { prisma } from "@/app/client";

export default async function ClockAppLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
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

  return (
    <>
      <NavBar
        isAdmin={isAdmin}
        isTerminal={isTerminal}
        isApproved={isApproved}
        schoolId={schoolId}
      />
      {children}
    </>
  );
}
