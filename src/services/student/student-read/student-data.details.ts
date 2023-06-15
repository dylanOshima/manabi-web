import { ID } from "@/lib/consts/ids";
import { TStudentData } from "@/lib/db/models/Student.model";

export const studentDataRouteURI = `/api/student/`;

export type TStudentDataRequestBody = {
  studentID?: ID;
};

export type TStudentDataRequestResponse = Omit<
  TStudentData,
  "passwordHash" | "courseIDs"
>;
