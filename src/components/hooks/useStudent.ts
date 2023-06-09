import { TStudentDataRequestResponse } from "@/services/student/student-read/student-data.details";
import { studentFetch } from "@/services/student/student-read/student-data.fetch";
import { useEffect, useState } from "react";

/**
 * Fetches the student object if the current user is a student. Otherwise
 * returns null.
 */
export default function useStudent(studentID?: number) {
  const [student, setStudent] = useState<TStudentDataRequestResponse | null>(
    null,
  );
  useEffect(() => {
    studentFetch({
      studentID,
    }).then((studentData) => setStudent(studentData));
  }, [studentID]);
  return student;
}
