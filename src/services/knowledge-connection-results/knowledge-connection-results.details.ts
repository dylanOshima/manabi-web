import { ID } from "@/lib/consts/ids";

export const knowledgeConnectionResultsRouteURI = (knowledgeConnectionID: ID) => `/api/knowledge-connection/${knowledgeConnectionID}/results`;

export type TKnowledgeConnectionResultsRequestBody = {
  studentID: ID,
};

export type TKnowledgeConnectionResultsRequestResponse = {
  strength: number,
};
