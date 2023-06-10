import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { prisma } from "@/app/client";
import { redirect } from "next/navigation";

export default async function handleAdminPageProtection() {
  const session = await getServerSession(authOptions);
  if (session) {
    const { isAdmin } = (await prisma.user.findUnique({
      where: { email: session.user?.email ?? "" },
      select: { isAdmin: true },
    })) ?? { isAdmin: false };
    if (!isAdmin) {
      redirect("/hours");
    }
  } else {
    redirect("/");
  }
}
