import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function Hours() {
  const session = await getServerSession(authOptions);
  if (session) {
    return <></>;
  }
}
