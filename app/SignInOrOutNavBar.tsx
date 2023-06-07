"use client";

import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";

export type NavBarItem = {
  name: string;
  href: string;
};

export default function SignInOrOutNavBar({
  isSignInBar,
  navBarItems,
}: {
  isSignInBar: boolean;
  navBarItems?: NavBarItem[];
}) {
  return (
    <section>
      <nav
        className={`flex h-14 content-center items-center justify-between bg-accent px-6`}
      >
        <div>
          {navBarItems?.map((navBarItem, index) => (
            <Link
              key={index}
              href={navBarItem.href}
              className="mx-6 text-xl font-bold transition-colors hover:text-yellow-300"
            >
              {navBarItem.name}
            </Link>
          ))}
        </div>
        <div>
          {isSignInBar ? (
            <p
              className="mx-6 text-xl font-bold transition-colors hover:text-yellow-300"
              onClick={() => signIn("google")}
            >
              Sign In
            </p>
          ) : (
            <p
              className="mx-6 text-xl font-bold transition-colors hover:text-yellow-300"
              onClick={() => signOut()}
            >
              Sign Out
            </p>
          )}
        </div>
      </nav>
    </section>
  );
}
