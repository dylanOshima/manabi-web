import { ID } from "src/consts/ids";
import type TextResponseModel from "../models/responses/TextResponse.model";

export const knowledgeConnectionResultsRouteURI = (knowledgeConnectionID: ID) => `/api/${knowledgeConnectionID}/results`;

export type TKnowledgeConnectionResultsRequestBody = {
  studentID: ID,
  knowledgeConnectionID: ID;
};

export type TKnowledgeConnectionResultsRequestResponse = TextResponseModel['data'];
