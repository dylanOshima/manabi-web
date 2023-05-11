import { TResponse, TResponseEvaluation } from "../models/responses/Response.model";

export const questionAnsweringRouteURI = (questionID: string) => `/api/${questionID}/answer`;

export type TQuestionAnsweringRequestBody = {
  questionID: string;
  answer: string;
};

export type TQuestionAnsweringRequestResponse = TResponse<string, TResponseEvaluation>;
