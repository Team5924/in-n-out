"use client";

import { useRef, useState } from "react";
import BarcodeScanner from "@/app/(clock-app)/terminal/BarcodeScanner";
import LoginWithStudentIdForm from "@/app/(clock-app)/terminal/LoginWithStudentIdForm";
import {
  clockIn,
  clockOut,
  getUserNameAndEmailBySchoolId,
  isClockedIn,
} from "@/app/actions";

type PageType = "terminal" | "clocked-in" | "clocked-out" | "no-user";

export default function SignInTerminal() {
  const [page, setPage] = useState<PageType>("terminal");
  const userName = useRef("");

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
    <div className="flex flex-col items-center">
      {page === "terminal" && (
        <>
          <h2 className="mb-7 mt-9 text-5xl font-bold">Terminal</h2>
          <div className="flex items-center w-full justify-evenly">
            <BarcodeScanner onResult={toggleUserClockStatus} />
            <LoginWithStudentIdForm onSubmit={toggleUserClockStatus} />
          </div>
        </>
      )}
      {page === "clocked-in" && (
        <h1 className="text-6xl font-extrabold mt-20">
          Welcome, {userName.current}!
        </h1>
      )}
      {page === "clocked-out" && (
        <h1 className="text-6xl font-extrabold mt-20">
          Thanks for coming, {userName.current}!
        </h1>
      )}
      {page === "no-user" && (
        <h1 className="text-6xl font-extrabold mt-20">
          No user with that ID found!
        </h1>
      )}
    </div>
  );
}
