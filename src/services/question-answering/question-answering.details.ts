import { ID } from "src/consts/ids";
import type TextResponseModel from "../models/responses/TextResponse.model";

export const questionAnsweringRouteURI = (questionID: ID) => `/api/${questionID}/answer`;

export type TQuestionAnsweringRequestBody = {
  questionID: ID;
  studentID: ID,
  answer: string;
};

export type TQuestionAnsweringRequestResponse = TextResponseModel['data'];
