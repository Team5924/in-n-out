import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getHours } from "@/app/(clock-app)/reads";

export default async function Hours() {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex flex-grow flex-col items-center justify-center h-[90vh]">
      <h2 className="mb-9 text-5xl font-bold">
        Hello {session?.user?.name?.split(" ")[0]},
      </h2>
      <h3 className="text-4xl font-bold">You have</h3>
      <h1 className="my-3 text-8xl font-extrabold">
        {await getHours(session?.user?.email ?? "")}
      </h1>
      <h3 className="text-4xl font-bold">hours</h3>
    </div>
  );
}
