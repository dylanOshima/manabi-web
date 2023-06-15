import { ID } from "@/lib/consts/ids";
import { TKnowledgeConnectionData } from "@/lib/db/models/KnowledgeConnection.model";

export const knowledgeConnectionRouteURI = '/api/knowledge/create-connection';

export type TKnowledgeConnectionRequestBody = {
  knowledgeID: ID,
  studentID: ID,
};

export type TKnowledgeConnectionRequestResponse = {
  connection: TKnowledgeConnectionData
};
