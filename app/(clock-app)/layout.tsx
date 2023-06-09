import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";
import SignInOrOutNavBar from "@/app/SignInOrOutNavBar";

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
