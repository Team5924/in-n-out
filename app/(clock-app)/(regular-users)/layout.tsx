import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { prisma } from "@/app/client";
import { redirect } from "next/navigation";

export default async function RegularUsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const { isAdmin, isTerminal, isApproved, schoolId } =
    (await prisma.user.findUnique({
      where: { email: session?.user?.email ?? "" },
      select: {
        isAdmin: true,
        isTerminal: true,
        isApproved: true,
        schoolId: true,
      },
    })) ?? {};

  // School ID and non-terminal can access
  // Else if terminal permission denied, else redirect to set-school-id
  if (!isTerminal) {
    if (schoolId) {
      return <>{children}</>;
    } else {
      redirect("/set-school-id");
    }
  } else {
    redirect("/terminal");
  }
}
