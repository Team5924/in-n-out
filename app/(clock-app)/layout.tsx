import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";
import SignInOrOutNavBar from "@/app/SignInOrOutNavBar";
import { prisma } from "@/app/client";

export default async function ClockAppLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const navBarItems = [
    { name: "Hours", href: "/hours" },
    { name: "Leaderboard", href: "/leaderboard" },
  ];

  const session = await getServerSession(authOptions);
  if (session) {
    const { isAdmin } = (await prisma.user.findUnique({
      where: { email: session.user?.email ?? "" },
      select: { isAdmin: true },
    })) ?? { isAdmin: false };
    if (isAdmin) {
      navBarItems.push(
        { name: "Admin", href: "/admin" },
        { name: "Clock-In/Out Terminal", href: "/terminal" }
      );
    }
    return (
      <div className="flex min-h-screen flex-col">
        <SignInOrOutNavBar
          navBarItems={navBarItems}
          isSignInBar={false}
        ></SignInOrOutNavBar>
        {children}
      </div>
    );
  } else {
    redirect("/");
  }
}
