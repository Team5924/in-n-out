"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import React from "react";
import ProfilePictureSignOut from "@/app/ProfilePictureSignOut";

export type NavBarItem = {
  name: string;
  href: string;
};

export default function SignInOrOutNavBar({
  navBarItems,
  signOutProfileImageSrc,
}: {
  navBarItems?: NavBarItem[];
  signOutProfileImageSrc?: string;
}) {
  return (
    <section>
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
          {signOutProfileImageSrc ? (
            <ProfilePictureSignOut
              signOutProfileImageSrc={signOutProfileImageSrc}
            ></ProfilePictureSignOut>
          ) : (
            <p
              className="mx-7 text-xl font-bold transition-colors hover:text-yellow-300"
              onClick={() => signIn("google")}
            >
              Sign In
            </p>
          )}
        </div>
      </nav>
    </section>
  );
}
