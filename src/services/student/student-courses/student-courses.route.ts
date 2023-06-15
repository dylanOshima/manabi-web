import type { NextApiRequest, NextApiResponse } from "next";
import type { TStudentCourseDataRequestBody } from "./student-courses.details";

import { withSessionRoute } from "@/lib/auth/withSession";
import { maybeID } from "@/lib/consts/ids";
import CourseModel from "@/lib/db/models/Course.model";
import StudentModel from "@/lib/db/models/Student.model";
import { HTTPBadRequest } from "@/lib/errors/HTTPErrors";
import Logger from "@/lib/loggers/Logger";
import { GET_STUDENT_COURSES_DATA } from "@/lib/loggers/LoggingEvents";
import { includes } from "lodash";

async function readStudentCoursesRoute(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const logger = new Logger().setEvent(GET_STUDENT_COURSES_DATA);
  try {
    // Fetch parameters from request
    const body = req.body as TStudentCourseDataRequestBody;
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
    const courses = (await CourseModel.queryAll())
      .filter((course) => includes(student.data.courseIDs, course.id))
      .value();
    const data = courses.map((course) => ({
      ...course,
      knowledgeIDs: undefined,
      studentIDs: undefined,
    }));
    logger.setAdditionalData({
      courses,
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

export default withSessionRoute(readStudentCoursesRoute);
