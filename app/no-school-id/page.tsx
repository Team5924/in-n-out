import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { prisma } from "@/app/client";
import { redirect } from "next/navigation";
import SignOutHorizontalNavBar from "@/app/SignOutHorizontalNavBar";
import StudentIdForm from "@/app/no-school-id/StudentIdForm";

export default async function NotApproved() {
  const session = await getServerSession(authOptions);
  if (session) {
    const userEmail = session.user?.email ?? "";
    const { isApproved } =
      (await prisma.user.findUnique({
        where: { email: userEmail },
        select: { isApproved: true },
      })) ?? {};
    if (isApproved) {
      redirect("/hours");
    } else {
      const { schoolId } =
        (await prisma.user.findUnique({
          where: { email: userEmail },
          select: { schoolId: true },
        })) ?? {};
      if (schoolId) {
        redirect("/not-approved");
      } else {
        return (
          <>
            <SignOutHorizontalNavBar
              signOutProfileImageSrc={session.user?.image ?? ""}
            />
            <h2 className="mx-4 my-7 text-4xl font-bold">
              Please enter your school ID number to finish account creation.
            </h2>
            <h3 className="mx-4 my-7 text-2xl font-semibold">{`Signed in as ${session.user?.email}`}</h3>
            <p className="mx-4 mb-3">Enter your school ID:</p>
            <StudentIdForm />
          </>
        );
      }
    }
  } else {
    redirect("/");
  }
}
