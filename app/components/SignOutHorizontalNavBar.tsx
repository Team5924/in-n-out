"use client";

import Link from "next/link";
import React from "react";
import ProfilePictureSignOut from "@/app/components/ProfilePictureSignOut";

export type NavBarItem = {
  name: string;
  href: string;
};

export default function SignOutHorizontalNavBar({
  navBarItems,
  signOutProfileImageSrc,
}: {
  navBarItems?: NavBarItem[];
  signOutProfileImageSrc: string;
}) {
  let display = "";
  if (navBarItems) {
    if (navBarItems.length >= 5) {
      display = "hidden lg:block";
    } else if (navBarItems.length >= 3) {
      display = "hidden md:block";
    }
  }
  return (
    <section className={display}>
      <nav className="flex h-14 content-center items-center justify-between bg-primary px-6">
        <div>
          {navBarItems?.map((navBarItem, index) => (
            <Link
              key={index}
              href={navBarItem.href}
              className="mx-7 text-xl font-bold transition-colors hover:text-yellow-300"
            >
              {navBarItem.name}
            </Link>
          ))}
        </div>
        <div>
          <ProfilePictureSignOut
            signOutProfileImageSrc={signOutProfileImageSrc}
            rightSide={true}
          ></ProfilePictureSignOut>
        </div>
      </nav>
    </section>
  );
}
