import withErrorHandling from "@/lib/utils/withErrorHandling";
import readStudentRoute from "@/services/student/student-read/student-data.route";
import { NextApiRequest, NextApiResponse } from "next";

/**
 * API handler for CRUD operations on Student
 */
function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      readStudentRoute(req, res);
      break;
  }
}

export default withErrorHandling(handler);
