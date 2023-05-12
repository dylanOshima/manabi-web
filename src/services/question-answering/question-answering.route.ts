import type { NextApiRequest, NextApiResponse } from "next";
import QuestionModel from "../models/Question.model";
import TextResponseModel from "../models/responses/TextResponse.model";
import { genID } from "../../consts/ids";
import BasicLogger from "../loggers/BasicLogger";

export default async function answerValidationRoute(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Fetch parameters from request
  const questionID = Number(req.query.questionID)
  const userInput = req.body as string;
  // Generate data models
  const responseID = genID();
  const newResponse = new TextResponseModel(
    responseID,
    { userInput },
    questionID
  );
  const question = QuestionModel.fetch(questionID);
  const { data } = await question.genAnswer(newResponse);
  res.status(200).json(data);

  return (new BasicLogger({
    requestData: {
      userInput,
    },
    responseData: {
      data,
    }
  })).log();
}
