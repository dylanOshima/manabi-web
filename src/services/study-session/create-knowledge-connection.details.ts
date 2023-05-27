import { ID } from "src/consts/ids";
import { TKnowledgeConnectionData } from "../models/KnowledgeConnection.model";

export const knowledgeConnectionRouteURI = '/api/knowledge/create-connection';

export type TKnowledgeConnectionRequestBody = {
  knowledgeID: ID,
  studentID: ID,
};

export type TKnowledgeConnectionRequestResponse = {
  connection: TKnowledgeConnectionData
};
