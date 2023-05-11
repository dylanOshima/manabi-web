import { TResponse, TResponseEvaluation } from "../models/responses/Response.model";
import TextResponseModel from "../models/responses/TextResponse.model";

export const questionAnsweringRouteURI = (questionID: string) => `/api/${questionID}/answer`;

export type TQuestionAnsweringRequestBody = {
  questionID: string;
  answer: string;
};

export type TQuestionAnsweringRequestResponse = TResponse<string, TResponseEvaluation>;
