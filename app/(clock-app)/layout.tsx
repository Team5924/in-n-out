import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";
import SignOutHorizontalNavBar from "@/app/SignOutHorizontalNavBar";
import { prisma } from "@/app/client";
import SignOutVerticalNavBar from "@/app/SignOutVerticalNavBar";

export default async function ClockAppLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const navBarItems = [
    { name: "Hours", href: "/hours" },
    { name: "Leaderboard", href: "/leaderboard" },
    { name: "Activity", href: "/activity" },
  ];

  const session = await getServerSession(authOptions);
  if (session) {
    const { isAdmin, isApproved } =
      (await prisma.user.findUnique({
        where: { email: session.user?.email ?? "" },
        select: { isAdmin: true, isApproved: true },
      })) ?? {};
    if (isApproved) {
      if (isAdmin) {
        navBarItems.push(
          { name: "Admin", href: "/admin" },
          { name: "Clock-In/Out Terminal", href: "/terminal" },
        );
      }
      return (
        <div className="flex min-h-screen flex-col">
          <SignOutHorizontalNavBar
            navBarItems={navBarItems}
            signOutProfileImageSrc={
              session?.user?.image ?? "/public/default-pfp.png"
            }
          ></SignOutHorizontalNavBar>
          <SignOutVerticalNavBar
            navBarItems={navBarItems}
            signOutProfileImageSrc={
              session?.user?.image ?? "/public/default-pfp.png"
            }
          ></SignOutVerticalNavBar>
          {children}
        </div>
      );
    } else {
      const { schoolId } =
        (await prisma.user.findUnique({
          where: { email: session.user?.email ?? "" },
          select: { schoolId: true },
        })) ?? {};
      if (schoolId) {
        redirect("/not-approved");
      } else {
        redirect("/no-school-id");
      }
    }
  } else {
    redirect("/");
  }
}
