import { getNamesOfClockedInAndOutUsers } from "@/app/(clock-app)/reads";
import ActivityUserCard from "@/app/(clock-app)/activity/ActivityUserCard";

export default async function Activity() {
  const namesOfClockedInAndOutUsers = await getNamesOfClockedInAndOutUsers();
  return (
    <div className="flex flex-col items-center">
      <h2 className="mb-7 mt-9 text-5xl font-bold">Activity</h2>
      {namesOfClockedInAndOutUsers.map((user, index) => (
        <ActivityUserCard
          name={user.name}
          clockedIn={user.clockedIn}
          key={index}
        ></ActivityUserCard>
      ))}
    </div>
  );
}
