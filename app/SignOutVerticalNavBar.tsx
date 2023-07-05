"use client";

import { NavBarItem } from "@/app/SignInHorizontalNavBar";
import ProfilePictureSignOut from "@/app/ProfilePictureSignOut";
import { RxHamburgerMenu } from "react-icons/rx";
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
          <RxHamburgerMenu
            className="h-7 w-7"
            onClick={() => setMenuOpen(!menuOpen)}
          ></RxHamburgerMenu>
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
