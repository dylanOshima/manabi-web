import type { NextApiRequest, NextApiResponse } from "next";
import type {
  TStudentDataRequestBody,
  TStudentDataRequestResponse,
} from "./student-data.details";

import { withSessionRoute } from "@/lib/auth/withSession";
import { maybeID } from "@/lib/consts/ids";
import StudentModel from "@/lib/db/models/Student.model";
import { HTTPBadRequest } from "@/lib/errors/HTTPErrors";
import Logger from "@/lib/loggers/Logger";
import { GET_STUDENT_DATA } from "@/lib/loggers/LoggingEvents";

async function readStudentRoute(req: NextApiRequest, res: NextApiResponse) {
  const logger = new Logger().setEvent(GET_STUDENT_DATA);
  try {
    // Fetch parameters from request
    const body = req.body as TStudentDataRequestBody;
    let studentID;
    if (body?.studentID != null) {
      studentID = body.studentID;
    } else {
      studentID = req.session.viewer?.id;
    }
    studentID = maybeID(studentID);
    logger.setAdditionalData({
      requestData: {
        studentID,
      },
    });
    if (studentID == null) {
      throw new HTTPBadRequest("Route had a non-ID student");
    }
    // Generate data models
    const student = await StudentModel.fetch(studentID);
    const data = {
      id: student.data.id,
      email: student.data.email,
      firstName: student.data.firstName,
      lastName: student.data.lastName,
    } as TStudentDataRequestResponse;
    logger.setAdditionalData({
      responseData: {
        ...data,
      },
    });
    res.status(200).json(data);
  } catch (error) {
    logger.setError(error);
  } finally {
    return logger.log();
  }
}

export default withSessionRoute(readStudentRoute);
