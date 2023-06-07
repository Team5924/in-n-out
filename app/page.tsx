import Image from "next/image";
import inNOutLogo from "/public/in-n-out.png";
import SignInOrOutNavBar from "@/app/SignInOrOutNavBar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/hours");
  } else {
    return (
      <div>
        <SignInOrOutNavBar isSignInBar={true}></SignInOrOutNavBar>
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
}
