export default function ActivityUserCard({
  name,
  clockStatus,
}: {
  name: string;
  clockStatus: "clocked-in" | "clocked-out" | "over-clocked";
}) {
  return (
    <div
      className={`m-2 flex w-5/6 items-center justify-between rounded border-2 p-3 sm:w-2/3 md:w-7/12 xl:w-1/2 ${
        clockStatus == "over-clocked"
          ? "border-white bg-red-700"
          : clockStatus == "clocked-in"
          ? "border-white bg-secondary"
          : "border-gray-600"
      }`}
    >
      <p
        className={`font-semibold ${
          clockStatus == "clocked-in"
            ? "text-gray-800"
            : clockStatus == "clocked-out"
            ? "text-gray-600"
            : "text-gray-400"
        }`}
      >
        {name}
      </p>
      <span
        className={`h-6 w-6 rounded-full border-2 border-gray-500 ${
          clockStatus == "clocked-in" || clockStatus == "over-clocked"
            ? "bg-green-500"
            : "bg-red-600"
        }`}
      ></span>
    </div>
  );
}
