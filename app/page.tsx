import Image from "next/image";
import inNOutLogo from "/public/in-n-out.png";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { prisma } from "@/app/client";
import NavBar from "@/app/components/NavBar";
import React from "react";

export default async function Home() {
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
    <div>
      <NavBar
        isAdmin={isAdmin}
        isTerminal={isTerminal}
        isApproved={isApproved}
        schoolId={schoolId}
      />
      <div className="mt-11 flex flex-col items-center sm:mt-5 md:mt-0">
        <Image
          src={inNOutLogo}
          alt="In-N-Out Logo"
          className="w-2/3 animate-fade-in sm:w-1/2 lg:w-1/3"
        ></Image>
        <h1 className="animate-fade-in text-4xl font-bold text-yellow-300 sm:text-5xl lg:text-6xl">
          In-N-Out Hour Tracker
        </h1>
      </div>
    </div>
  );
}
