import Image from "next/image";
import inNOutLogo from "/public/in-n-out.png";
import SignInHorizontalNavBar from "@/app/SignInHorizontalNavBar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";
import { prisma } from "@/app/client";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (session) {
    const { isApproved } =
      (await prisma.user.findUnique({
        where: { email: session.user?.email ?? "" },
        select: { isApproved: true },
      })) ?? {};
    if (isApproved) {
      redirect("/hours");
    } else {
      const { schoolId } =
        (await prisma.user.findUnique({
          where: { email: session.user?.email ?? "" },
          select: { schoolId: true },
        })) ?? {};
      if (schoolId) {
        redirect("/not-approved");
      } else {
        redirect("/no-school-id");
      }
    }
  } else {
    return (
      <div>
        <SignInHorizontalNavBar></SignInHorizontalNavBar>
        <div className="mt-11 flex flex-col items-center sm:mt-5 md:mt-0">
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
