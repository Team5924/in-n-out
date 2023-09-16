import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import SignOutHorizontalNavBar from "@/app/components/SignOutHorizontalNavBar";
import SignOutVerticalNavBar from "@/app/components/SignOutVerticalNavBar";
import React from "react";
import SignInHorizontalNavBar from "@/app/components/SignInHorizontalNavBar";

// Picks proper type of NavBar and which links to show based on factors
export default async function NavBar({
  isAdmin,
  isTerminal,
  isApproved,
  schoolId,
}: {
  isAdmin: boolean | undefined;
  isTerminal: boolean | undefined;
  isApproved: boolean | undefined;
  schoolId: number | null | undefined;
}) {
  const session = await getServerSession(authOptions);
  if (session) {
    const navBarItems: { name: string; href: string }[] = [];

    if (isTerminal) {
      navBarItems.push({ name: "Clock-In/Out Terminal", href: "/terminal" });
    } else if (isApproved && schoolId) {
      navBarItems.push(
        { name: "Hours", href: "/hours" },
        { name: "Leaderboard", href: "/leaderboard" },
        { name: "Activity", href: "/activity" },
      );
      if (isAdmin) {
        navBarItems.push(
          { name: "Admin", href: "/admin" },
          { name: "Clock-In/Out Terminal", href: "/terminal" },
        );
      }
    }

    return (
      <div className="flex flex-col">
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
      </div>
    );
  }
  return <SignInHorizontalNavBar></SignInHorizontalNavBar>;
}
