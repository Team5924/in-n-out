"use client";

import StudentIdForm from "@/app/components/StudentIdForm";
import { setUserSchoolId } from "@/app/actions";

export default function SetStudentIdForm() {
  async function setUserSchoolIdAndRedirect(schoolIdNum: number) {
    await setUserSchoolId(schoolIdNum);
    return true;
  }

  return <StudentIdForm onSubmit={setUserSchoolIdAndRedirect} center={false} />;
}
