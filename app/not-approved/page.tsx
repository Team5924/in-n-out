import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { prisma } from "@/app/client";
import { redirect } from "next/navigation";
import SignOutHorizontalNavBar from "@/app/SignOutHorizontalNavBar";

export default async function NotApproved() {
  const session = await getServerSession(authOptions);
  if (session) {
    const { isApproved } =
      (await prisma.user.findUnique({
        where: { email: session.user?.email ?? "" },
        select: { isApproved: true },
      })) ?? {};
    const { schoolId } =
      (await prisma.user.findUnique({
        where: { email: session.user?.email ?? "" },
        select: { schoolId: true },
      })) ?? {};
    if (isApproved) {
      if (schoolId) {
        redirect("/hours");
      } else {
        redirect("/no-school-id");
      }
    } else {
      if (schoolId) {
        return (
          <>
            <SignOutHorizontalNavBar
              signOutProfileImageSrc={session.user?.image ?? ""}
            ></SignOutHorizontalNavBar>
            <h1 className="mx-4 my-7 text-5xl font-bold">
              Waiting For Account Approval
            </h1>
            <h3 className="mx-4 my-7 text-2xl font-semibold">{`Signed in as ${session.user?.email}`}</h3>
            <p className="mx-4">
              Your account was created successfully! Please notify Chris Voon or
              a mentor that you have requested access to the app.
            </p>
          </>
        );
      } else {
        redirect("/no-school-id");
      }
    }
  } else {
    redirect("/");
  }
}
