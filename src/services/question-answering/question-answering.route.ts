import type { NextApiRequest, NextApiResponse } from "next";
import type { TQuestionAnsweringRequestBody } from "./question-answering.details";

import QuestionModel from "../models/Question.model";
import TextResponseModel from "../models/responses/TextResponse.model";
import { ID } from "../../consts/ids";
import BasicLogger from "../loggers/BasicLogger";
import { VALIDATE_USER_ANSWER } from "../loggers/LoggingEvents";

export default async function answerValidationRoute(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Fetch parameters from request
  const questionID = ID(req.query.questionID);
  const { answer: userInput, ...body } = req.body as TQuestionAnsweringRequestBody;
  const studentID = ID(body.studentID);
  // Generate data models
  const newResponse = await TextResponseModel.create({
    studentID,
    questionID,
    userInput,
  });
  const question = await QuestionModel.fetch(questionID);
  const { data } = await question.genAnswer(newResponse);

  res.status(200).json(data);
  return (new BasicLogger({
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
