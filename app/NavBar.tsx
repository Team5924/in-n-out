import Link from "next/link";
import React from "react";

export type NavBarItem = {
  name: string;
  href: string;
};

export default function NavBar({
  navBarItems,
  itemsStartLeft,
}: {
  navBarItems: NavBarItem[];
  itemsStartLeft: boolean;
}) {
  return (
    <section>
      <nav
        className={`flex h-14 content-center items-center ${
          itemsStartLeft ? "justify-start" : "justify-end"
        } bg-accent px-6`}
      >
        {navBarItems.map((navBarItem, index) => (
          <Link
            key={index}
            href={navBarItem.href}
            className="mx-6 text-xl font-bold transition-colors hover:text-yellow-300"
          >
            {navBarItem.name}
          </Link>
        ))}
      </nav>
    </section>
  );
}
