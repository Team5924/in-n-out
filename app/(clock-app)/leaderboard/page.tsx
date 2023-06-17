import { getAllUsers, getHours } from "@/app/actions";

export default async function Leaderboard() {
  async function getNamesAndHoursOfUsers() {
    const users = await getAllUsers();
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

  const namesAndHoursOfUsers = await getNamesAndHoursOfUsers();
  return (
    <>
      <p>Leaderboard</p>
      {namesAndHoursOfUsers.map((nameAndHourOfUser, index) => (
        <p key={index}>
          {nameAndHourOfUser.name + " " + nameAndHourOfUser.hours}
        </p>
      ))}
    </>
  );
}
