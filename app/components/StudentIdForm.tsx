import { useState } from "react";
import { redirect } from "next/navigation";

export default function StudentIdForm({
  onSubmit,
  center,
}: {
  onSubmit: (schoolId: number) => Promise<boolean>;
  center: boolean;
}) {
  const [isErrorShowing, setErrorShowing] = useState(false);

  async function handleSubmit(formData: FormData) {
    const schoolId = formData.get("schoolId");
    if (typeof schoolId === "string") {
      if (/^\d+$/.test(schoolId)) {
        const schoolIdNum = parseInt(schoolId);
        if (await onSubmit(schoolIdNum)) {
          redirect("/not-approved");
        }
      } else {
        setErrorShowing(true);
      }
    }
  }

  return (
    <form
      action={handleSubmit}
      className={`${center ? "flex flex-col items-center" : ""}`}
    >
      <input
        className="block mx-4 mb-3 text-black rounded-md px-px py-0.5 outline-yellow-300"
        placeholder="School ID #"
        name="schoolId"
        maxLength={6}
        autoFocus
      />
      {isErrorShowing && (
        <p className="mx-4 my-3 text-red-600">
          Invalid input. Please use numbers only.
        </p>
      )}
      <button
        className="block mx-4 text-black font-semibold bg-yellow-300 py-2 px-3 rounded-md hover:bg-yellow-200"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
}
