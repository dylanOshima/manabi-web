import { ID } from "@/lib/consts/ids";
import type TextResponseModel from "@/lib/db/models/responses/TextResponse.model";

export const questionAnsweringRouteURI = (questionID: ID) => `/api/${questionID}/answer`;

export type TQuestionAnsweringRequestBody = {
  questionID: ID,
  knowledgeConnectionID: ID;
  studentID: ID,
  answer: string;
};

export type TQuestionAnsweringRequestResponse = TextResponseModel['data'];
