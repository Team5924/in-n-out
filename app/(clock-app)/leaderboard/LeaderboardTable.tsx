export default function LeaderboardTable({
  namesAndHoursOfUsers,
}: {
  namesAndHoursOfUsers: { name: string; hours: number }[];
}) {
  return (
    <table className="w-7/12 table-fixed border-2 border-white">
      <thead>
        <tr>
          <th className="border-2 border-white bg-secondary p-3 text-lg font-bold text-gray-900">
            Name
          </th>
          <th className="border-2 border-white bg-secondary p-3 text-lg font-bold text-gray-900">
            Hours
          </th>
        </tr>
      </thead>
      <tbody>
        {namesAndHoursOfUsers.map((nameAndHoursOfUser, index) => (
          <tr key={index}>
            <td className="border-2 border-white p-3">
              {nameAndHoursOfUser.name}
            </td>
            <td className="border-2 border-white p-3">
              {nameAndHoursOfUser.hours}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
