import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { prisma } from "@/app/client";
import NavBar from "@/app/components/NavBar";
import React from "react";
import { redirect } from "next/navigation";

export default async function NotApproved() {
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

  // Logged in not approved users with school id set can access
  // Else redirected to set-school-id if no school id, else permission denied
  if (session && !isApproved) {
    if (schoolId) {
      return (
        <>
          <NavBar
            isAdmin={isAdmin}
            isTerminal={isTerminal}
            isApproved={isApproved}
            schoolId={schoolId}
          />
          <h1 className="mx-4 my-7 text-5xl font-bold">
            Waiting For Account Approval
          </h1>
          <h3 className="mx-4 my-7 text-2xl font-semibold">{`Signed in as ${session?.user?.email}`}</h3>
          <p className="mx-4">
            Your account was created successfully! Please notify Chris Voon or a
            mentor that you have requested access to the app.
          </p>
        </>
      );
    } else {
      redirect("/set-school-id");
    }
  } else {
    redirect("/permission-denied");
  }
}
