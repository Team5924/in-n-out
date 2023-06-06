import React from "react";
import NavBar, { NavBarItem } from "@/app/NavBar";

export default function ClockAppLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const navBarItems: NavBarItem[] = [
    { name: "Hours", href: "/hours" },
    { name: "Leaderboard", href: "/leaderboard" },
  ];
  return <NavBar navBarItems={navBarItems} itemsStartLeft={true}></NavBar>;
}
