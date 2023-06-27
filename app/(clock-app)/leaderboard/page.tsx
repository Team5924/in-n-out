import { getHours, getNamesAndEmailsOfAllUsers } from "@/app/(clock-app)/reads";
import LeaderboardTable from "@/app/(clock-app)/leaderboard/LeaderboardTable";

export default async function Leaderboard() {
  async function getNamesAndHoursOfUsers() {
    const users = await getNamesAndEmailsOfAllUsers();
    const namesAndHoursOfUsers: { name: string; hours: number }[] = [];
    for (const user of users) {
      if (user.email) {
        const userName = user.name ? user.name : user.email;
        const userHours = await getHours(user.email);
        namesAndHoursOfUsers.push({ name: userName, hours: userHours });
      }
    }
    return namesAndHoursOfUsers.sort((a, b) => {
      const aHours = a.hours;
      const bHours = b.hours;
      if (aHours < bHours) {
        return 1;
      } else if (aHours > bHours) {
        return -1;
      } else {
        const aName = a.name;
        const bName = b.name;
        if (aName < bName) {
          return -1;
        } else if (aName > bName) {
          return 1;
        } else {
          return 0;
        }
      }
    });
  }

  const namesAndHoursOfAllUsers = await getNamesAndHoursOfUsers();
  const namesAndHoursOfTopTenUsers = namesAndHoursOfAllUsers.slice(0, 10);
  return (
    <div className="flex flex-col items-center">
      <h2 className="mb-7 mt-9 text-5xl font-bold">Leaderboard</h2>
      <LeaderboardTable
        namesAndHoursOfUsers={namesAndHoursOfTopTenUsers}
      ></LeaderboardTable>
    </div>
  );
}
