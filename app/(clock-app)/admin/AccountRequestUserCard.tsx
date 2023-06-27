"use client";

import { BsCheckLg, BsXLg } from "react-icons/bs";
import { useTransition } from "react";
import { approveUser, rejectUser } from "@/app/actions";

export default function AccountRequestUserCard({
  name,
  email,
}: {
  name: string;
  email: string;
}) {
  const [isPending, startTransition] = useTransition();
  return (
    <div className="m-2 flex w-5/6 items-center justify-between rounded border-2 border-white bg-secondary p-2 sm:w-2/3 md:w-7/12 xl:w-1/2">
      <p className="font-semibold text-gray-800">{`${name} (${email})`}</p>
      <div className="flex items-center">
        <BsCheckLg
          className="m-1 h-[2.4em] w-[2.4em] fill-gray-800 transition-all hover:scale-125 hover:fill-green-700"
          onClick={() => startTransition(() => approveUser(email))}
        ></BsCheckLg>
        <BsXLg
          className="m-1 h-[1.9em] w-[1.9em] fill-gray-800 transition-all hover:scale-125 hover:fill-red-700"
          onClick={() => startTransition(() => rejectUser(email))}
        ></BsXLg>
      </div>
    </div>
  );
}
