import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function Hours() {
  const session = await getServerSession(authOptions);
  if (session) {
    return (
      <div className="flex flex-grow flex-col items-center justify-center">
        <h2 className="pb-9 text-5xl font-bold">
          Hello {session.user?.name?.split(" ")[0]},
        </h2>
        <h3 className="text-4xl font-bold">You have</h3>
        <h3 className="py-3 text-8xl font-extrabold">69</h3>
        <h3 className="text-4xl font-bold">Hours</h3>
      </div>
    );
  }
}
