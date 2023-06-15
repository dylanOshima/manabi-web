import withErrorHandling from "@/lib/utils/withErrorHandling";
import readStudentCoursesRoute from "@/services/student/student-courses/student-courses.route";
import { NextApiRequest, NextApiResponse } from "next";

/**
 * API handler for CRUD operations on Student
 */
function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      readStudentCoursesRoute(req, res);
      break;
  }
}

export default withErrorHandling(handler);
