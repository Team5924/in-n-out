"use client";

import { signIn } from "next-auth/react";
import React from "react";

export type NavBarItem = {
  name: string;
  href: string;
};

export default function SignInHorizontalNavBar() {
  return (
    <section>
      <nav className="flex h-14 content-center items-center justify-end bg-primary px-6">
        <p
          className="mx-7 text-xl font-bold transition-colors hover:text-yellow-300"
          onClick={() => signIn("google")}
        >
          Sign In
        </p>
      </nav>
    </section>
  );
}
