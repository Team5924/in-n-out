export default function ActivityUserCard({
  name,
  clockedIn,
}: {
  name: string;
  clockedIn: boolean;
}) {
  return (
    <div
      className={`m-4 flex items-center justify-between rounded border-2 p-3 ${
        clockedIn ? "border-white bg-[#2cb6c0]" : "border-gray-600"
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
