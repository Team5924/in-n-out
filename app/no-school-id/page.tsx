import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { prisma } from "@/app/client";
import { redirect } from "next/navigation";
import SignOutHorizontalNavBar from "@/app/SignOutHorizontalNavBar";
import SetStudentIdForm from "@/app/no-school-id/SetStudentIdForm";

export default async function NotApproved() {
  const session = await getServerSession(authOptions);
  if (session) {
    const userEmail = session.user?.email ?? "";
    const { isApproved } =
      (await prisma.user.findUnique({
        where: { email: userEmail },
        select: { isApproved: true },
      })) ?? {};
    const { schoolId } =
      (await prisma.user.findUnique({
        where: { email: userEmail },
        select: { schoolId: true },
      })) ?? {};
    if (isApproved) {
      if (schoolId) {
        redirect("/hours");
      }
    } else {
      if (schoolId) {
        redirect("/not-approved");
      }
    }
  } else {
    redirect("/");
  }

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
      <SetStudentIdForm />
    </>
  );
}
