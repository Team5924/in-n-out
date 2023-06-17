import { getAllUsers, isClockedIn } from "@/app/actions";

export default async function Activity() {
  async function getNamesOfClockedInUsers() {
    const users = await getAllUsers();
    const namesOfClockedInUsers: string[] = [];
    for (const user of users) {
      if (user.email) {
        const userClockedIn = await isClockedIn(user.email);
        console.log(userClockedIn + user.email);
        if (userClockedIn) {
          if (user.name) {
            namesOfClockedInUsers.push(user.name);
          } else {
            namesOfClockedInUsers.push(user.email);
          }
        }
      }
    }
    return namesOfClockedInUsers.sort();
  }

  const clockedInUsers = await getNamesOfClockedInUsers();
  return (
    <>
      {clockedInUsers.map((name, index) => (
        <div key={index}>
          <p>{name}</p>
        </div>
      ))}
    </>
  );
}
