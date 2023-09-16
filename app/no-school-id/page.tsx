import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { prisma } from "@/app/client";
import SetStudentIdForm from "@/app/no-school-id/SetStudentIdForm";
import NavBar from "@/app/components/NavBar";
import React from "react";

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

  return (
    <>
      <NavBar
        isAdmin={isAdmin}
        isTerminal={isTerminal}
        isApproved={isApproved}
        schoolId={schoolId}
      />
      <h2 className="mx-4 my-7 text-4xl font-bold">
        Please enter your school ID number to finish account creation.
      </h2>
      <h3 className="mx-4 my-7 text-2xl font-semibold">{`Signed in as ${session?.user?.email}`}</h3>
      <p className="mx-4 mb-3">Enter your school ID:</p>
      <SetStudentIdForm />
    </>
  );
}
