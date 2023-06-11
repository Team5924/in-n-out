"use client";

import { useTransition } from "react";
import { toggleClockStatus } from "@/app/actions";

export default function ToggleShiftButton({
  userEmail,
}: {
  userEmail: string | undefined | null;
}) {
  let [isPending, startTransition] = useTransition();

  if (userEmail) {
    return (
      <button
        onClick={() => startTransition(() => toggleClockStatus(userEmail))}
      >
        Clock Toggle
      </button>
    );
  } else {
    return <h1>Error</h1>;
  }
}
