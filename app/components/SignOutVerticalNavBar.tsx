"use client";

import { NavBarItem } from "@/app/components/SignInHorizontalNavBar";
import ProfilePictureSignOut from "@/app/components/ProfilePictureSignOut";
import { FiMenu } from "react-icons/fi";
import React, { useState } from "react";
import Link from "next/link";

export default function SignOutVerticalNavBar({
  navBarItems,
  signOutProfileImageSrc,
}: {
  navBarItems?: NavBarItem[];
  signOutProfileImageSrc?: string;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  let display = "";
  if (navBarItems) {
    if (navBarItems.length >= 5) {
      display += "lg:hidden";
    } else if (navBarItems.length >= 3) {
      display += "md:hidden";
    } else {
      display = "hidden";
    }
  } else {
    display = "hidden";
  }
  return (
    <section className={display}>
      <nav>
        <div className="flex h-14 content-center items-center justify-between bg-primary px-6">
          {signOutProfileImageSrc && (
            <ProfilePictureSignOut
              signOutProfileImageSrc={signOutProfileImageSrc}
              rightSide={false}
            ></ProfilePictureSignOut>
          )}
          <FiMenu
            className="h-8 w-8 stroke-white transition-colors hover:stroke-yellow-300"
            onClick={() => setMenuOpen(!menuOpen)}
          ></FiMenu>
        </div>
        {menuOpen &&
          navBarItems?.map((navBarItem, index) => (
            <Link
              key={index}
              href={navBarItem.href}
              className="flex h-14 content-center items-center justify-center bg-primary px-6 text-xl font-bold transition-colors hover:bg-[#9e2b23]"
              onClick={() => setMenuOpen(false)}
            >
              {navBarItem.name}
            </Link>
          ))}
      </nav>
    </section>
  );
}
