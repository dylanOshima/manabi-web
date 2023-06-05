import { TKnowledgeConnectionResultsRequestBody, TKnowledgeConnectionResultsRequestResponse, knowledgeConnectionResultsRouteURI } from "./knowledge-connection-results.details";

export const knowledgeConnectionResultsFetch = async (
  knowledgeConnectionID,
  requestBody: TKnowledgeConnectionResultsRequestBody
) => {
  const uri = knowledgeConnectionResultsRouteURI(knowledgeConnectionID);
  const response = await fetch(uri, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody),
  });

  const data =
    (await response.json()) as TKnowledgeConnectionResultsRequestResponse;
  if (response.status !== 200) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return data.strength;
};
