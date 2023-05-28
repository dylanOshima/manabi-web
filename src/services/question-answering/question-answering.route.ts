import type { NextApiRequest, NextApiResponse } from "next";
import type { TQuestionAnsweringRequestBody } from "./question-answering.details";

import QuestionModel from "../models/Question.model";
import TextResponseModel from "../models/responses/TextResponse.model";
import { ID, maybeID } from "../../consts/ids";
import Logger from "../loggers/Logger";
import { VALIDATE_USER_ANSWER } from "../loggers/LoggingEvents";

export default async function answerValidationRoute(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Fetch parameters from request
  const { answer: userInput, ...body } = req.body as TQuestionAnsweringRequestBody;
  const questionID = maybeID(req.query.questionID) ?? ID(body.questionID);
  const studentID = ID(body.studentID);
  const knowledgeConnectionID = ID(body.knowledgeConnectionID);
  // Generate data models
  const newResponse = await TextResponseModel.create({
    studentID,
    questionID,
    knowledgeConnectionID,
    userInput,
  });
  const question = await QuestionModel.fetch(questionID);
  const { data } = await question.genAnswer(newResponse);

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
