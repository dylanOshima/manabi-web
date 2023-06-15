import withErrorHandling from "@/lib/utils/withErrorHandling";
import readStudentStudySessionsRoute from "@/services/student/student-sessions/student-sessions.route";
import { NextApiRequest, NextApiResponse } from "next";

/**
 * API handler for CRUD operations on Student
 */
function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      readStudentStudySessionsRoute(req, res);
      break;
  }
}

export default withErrorHandling(handler);
