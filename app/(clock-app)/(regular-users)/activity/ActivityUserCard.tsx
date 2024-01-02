import { getUserNameAndEmailBySchoolId } from "@/app/actions";
import { useRef, useState } from "react";

export default function ActivityUserCard({
  name,
  clockStatus,
  isAdmin,
}: {
  name: string;
  clockStatus: "clocked-in" | "clocked-out" | "over-clocked";
  isAdmin: boolean
}) {

  async function toggleUserClockStatus(schoolId: number) {
    const { name, email } = (await getUserNameAndEmailBySchoolId(schoolId)) ?? {
      name: "",
      email: "",
    };
    if (email && name) {
      userName.current = name;
      setTimeout(() => setPage("terminal"), 4500);
      if (await isClockedIn(email)) {
        await clockOut(email);
        setPage("clocked-out");
      } else {
        await clockIn(email);
        setPage("clocked-in");
      }
    } else {
      setTimeout(() => setPage("terminal"), 4500);
      setPage("no-user");
    }
  }

  return (
    <div
      className={`m-2 flex w-5/6 items-center justify-between rounded border-2 p-3 sm:w-2/3 md:w-7/12 xl:w-1/2 ${clockStatus == "over-clocked"
          ? "border-white bg-red-700"
          : clockStatus == "clocked-in"
            ? "border-white bg-secondary"
            : "border-gray-600"
        }`}
    >
      <p
        className={`font-semibold ${clockStatus == "clocked-in"
            ? "text-gray-800"
            : clockStatus == "clocked-out"
              ? "text-gray-600"
              : "text-gray-400"
          }`}
      >
        {name}
      </p>
      {isAdmin &&
        <div>
          <button
            className="block mx-4 text-black font-semibold bg-yellow-300 py-2 px-3 rounded-md hover:bg-yellow-200"
            onClick={}
          >
            {clockStatus == "clocked-in" || clockStatus == "over-clocked" ? "Clock Out" : "Clock In"}
          </button>
        </div>}
      <span
        className={`h-6 w-6 rounded-full border-2 border-gray-500 ${clockStatus == "clocked-in" || clockStatus == "over-clocked"
            ? "bg-green-500"
            : "bg-red-600"
          }`}
      ></span>
    </div>
  );
}
