import StudentIdForm from "@/app/components/StudentIdForm";

export default function LoginWithStudentIdForm({
  onSubmit,
}: {
  onSubmit: (schoolId: number) => void;
}) {
  async function toggleUserClockStatus(schoolId: number) {
    onSubmit(schoolId);
    return false;
  }

  return <StudentIdForm onSubmit={toggleUserClockStatus} center={true} />;
}
