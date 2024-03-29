import SignInTerminal from "@/app/(clock-app)/terminal/SignInTerminal";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { prisma } from "@/app/client";
import { redirect } from "next/navigation";

export default async function Terminal() {
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

  // Terminal users can access
  // Else permission denied
  if (isTerminal) {
    return <SignInTerminal />;
  } else {
    redirect("/permission-denied");
  }
}
