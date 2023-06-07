import Image from "next/image";
import inNOutLogo from "/public/in-n-out.png";
import NavBar, { NavBarItem } from "@/app/NavBar";

export default function Home() {
  const navBarItems: NavBarItem[] = [
    { name: "Sign In", href: "/api/auth/signin" },
  ];

  return (
    <div>
      <NavBar navBarItems={navBarItems} itemsStartLeft={false}></NavBar>
      <div className="flex flex-col items-center">
        <Image
          src={inNOutLogo}
          alt="In-N-Out Logo"
          className="w-2/3 animate-fade-in sm:w-1/2 lg:w-1/3"
        ></Image>
        <h1 className="animate-fade-in text-4xl font-bold text-yellow-300 sm:text-5xl lg:text-6xl">
          In-N-Out Hour Tracker
        </h1>
      </div>
    </div>
  );
}
