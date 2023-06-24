export default function ActivityUserCard({
  name,
  clockedIn,
}: {
  name: string;
  clockedIn: boolean;
}) {
  return (
    <div
      className={`m-2 flex w-5/6 items-center justify-between rounded border-2 p-3 sm:w-2/3 md:w-7/12 xl:w-1/2 ${
        clockedIn ? "border-white bg-secondary" : "border-gray-600"
      }`}
    >
      <p
        className={`font-semibold ${
          clockedIn ? "text-gray-800" : "text-gray-600"
        }`}
      >
        {name}
      </p>
      <span
        className={`h-6 w-6 rounded-full border-2 border-gray-500 ${
          clockedIn ? "bg-green-500" : "bg-red-600"
        }`}
      ></span>
    </div>
  );
}
