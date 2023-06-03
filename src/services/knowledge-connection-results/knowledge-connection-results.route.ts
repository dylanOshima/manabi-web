import type { NextApiRequest, NextApiResponse } from "next";
import type { TKnowledgeConnectionResultsRequestBody } from "./knowledge-connection-results.details";

import QuestionModel from "../models/Question.model";
import TextResponseModel from "../models/responses/TextResponse.model";
import { ID, maybeID } from "../../consts/ids";
import Logger from "../loggers/Logger";
import { VALIDATE_USER_ANSWER } from "../loggers/LoggingEvents";
import KnowledgeConnectionModel from "../models/KnowledgeConnection.model";

export default async function knowledgeConnectionResultsRoute(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Fetch parameters from request
  const body = req.body as TKnowledgeConnectionResultsRequestBody;
  const knowledgeConnectionID = ID(body.knowledgeConnectionID);
  // Generate data models
  const connectiion = await KnowledgeConnectionModel.fetch(
    knowledgeConnectionID
  );

  res.status(200).json(data);
  return (new Logger({
    requestData: {
      questionID,
      studentID,
      userInput,
    },
    responseData: {
      ...data,
    }
  })).setEvent(VALIDATE_USER_ANSWER).log();
}
