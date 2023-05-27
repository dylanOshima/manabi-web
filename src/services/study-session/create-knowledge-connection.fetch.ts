import type {
  TKnowledgeConnectionRequestBody,
  TKnowledgeConnectionRequestResponse,
} from "./create-knowledge-connection.details";
import { knowledgeConnectionRouteURI } from "./create-knowledge-connection.details";

export const createKnowledgeConnectionFetch = async (
  fetchParams: TKnowledgeConnectionRequestBody
) => {
  const response = await fetch(knowledgeConnectionRouteURI, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(fetchParams),
  });

  const data =
    (await response.json()) as TKnowledgeConnectionRequestResponse;
  if (response.status !== 200) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return data.connection;
};
