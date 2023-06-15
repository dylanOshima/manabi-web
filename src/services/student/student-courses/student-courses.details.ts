import { ID } from "@/lib/consts/ids";
import { TCourseData } from "@/lib/db/models/Course.model";

export const studentModulesURI = `/api/student/courses`;

export type TStudentCourseDataRequestBody = {
  studentID?: ID;
};

export type TStudentCourseDataRequestResponse = Array<
  Omit<TCourseData, "studentIDs" | "knowledgeIDs">
>;
