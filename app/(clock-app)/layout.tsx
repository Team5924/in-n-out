import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import NavBar from "@/app/components/NavBar";
import { prisma } from "@/app/client";
import { redirect } from "next/navigation";

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

  // The following are common factors for all clock-app pages
  // Logged in approved users can access
  // Else if not approved redirect to not-approved, else permission denied
  if (session) {
    if (isApproved) {
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
    } else {
      redirect("/not-approved");
    }
  } else {
    redirect("/permission-denied");
  }
}
