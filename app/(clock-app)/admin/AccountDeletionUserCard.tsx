"use client";

import { BsCheckLg, BsFillTrashFill, BsXLg } from "react-icons/bs";
import { useState, useTransition } from "react";
import { deleteUser } from "@/app/actions";
import OutsideClickHandler from "react-outside-click-handler";

export default function AccountDeletionUserCard({
  name,
  email,
}: {
  name: string;
  email: string;
}) {
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [, startTransition] = useTransition();

  return (
    <>
      <div className="m-2 flex w-5/6 items-center justify-between rounded border-2 border-white bg-secondary p-2 sm:w-2/3 md:w-7/12 xl:w-1/2">
        <p className="font-semibold text-gray-800">{`${name} (${email})`}</p>
        <BsFillTrashFill
          className="m-1 h-[1.9em] w-[1.9em] fill-gray-800 transition-all hover:scale-125 hover:fill-red-700"
          onClick={() => setConfirmationOpen(true)}
        ></BsFillTrashFill>
      </div>
      {confirmationOpen && (
        <div className="fixed top-1/2 left-1/2 w-5/6 md:w-2/3 lg:w-3/5 -translate-x-1/2 -translate-y-1/2 bg-blue-950 text-center rounded-xl px-5 py-10">
          <OutsideClickHandler
            onOutsideClick={() => setConfirmationOpen(false)}
          >
            <p className="font-semibold text-3xl">
              Are you sure that you would like to delete the account belonging
              to {name}? ({email})
            </p>
            <div className="flex items-center justify-center mt-7">
              <BsCheckLg
                className="m-1 h-[3.6em] w-[3.6em] fill-gray-200 transition-all hover:scale-125 hover:fill-green-700"
                onClick={() => startTransition(() => deleteUser(email))}
              ></BsCheckLg>
              <BsXLg
                className="m-1 h-[2.8em] w-[2.8em] fill-gray-200 transition-all hover:scale-125 hover:fill-red-700"
                onClick={() => setConfirmationOpen(false)}
              ></BsXLg>
            </div>
          </OutsideClickHandler>
        </div>
      )}
    </>
  );
}
