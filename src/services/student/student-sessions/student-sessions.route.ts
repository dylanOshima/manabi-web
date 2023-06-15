import type { NextApiRequest, NextApiResponse } from "next";
import type { TStudentStudySessionsDataRequestBody } from "./student-sessions.details";

import { withSessionRoute } from "@/lib/auth/withSession";
import { maybeID } from "@/lib/consts/ids";
import KnowledgeModel from "@/lib/db/models/Knowledge.model";
import KnowledgeConnectionModel from "@/lib/db/models/KnowledgeConnection.model";
import StudentModel from "@/lib/db/models/Student.model";
import { HTTPBadRequest } from "@/lib/errors/HTTPErrors";
import Logger from "@/lib/loggers/Logger";
import { GET_STUDENT_STUDY_SESSION_DATA } from "@/lib/loggers/LoggingEvents";
import { includes } from "lodash";

async function readStudentStudySessionsRoute(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const logger = new Logger().setEvent(GET_STUDENT_STUDY_SESSION_DATA);
  try {
    // Fetch parameters from request
    const body = req.body as TStudentStudySessionsDataRequestBody;
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
    const sessions = (await KnowledgeConnectionModel.queryAll())
      .filter((connection) => student.data.id === connection.studentID)
      .value();
    const sessionKnowledgeIDs = sessions.map((session) => session.knowledgeID);
    const sessionKnowledge = (await KnowledgeModel.queryAll())
      .filter((knowledge) => includes(sessionKnowledgeIDs, knowledge.id))
      .value();
    const data = sessionKnowledge.map((knowledge) => ({
      knowledge,
      sessions: sessions
        .filter((session) => session.knowledgeID === knowledge.id)
        .map((session) => ({
          ...session,
          responseIDs: undefined,
        })),
    }));
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

export default withSessionRoute(readStudentStudySessionsRoute);
