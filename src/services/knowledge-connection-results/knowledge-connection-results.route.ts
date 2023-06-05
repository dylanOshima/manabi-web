import type { NextApiRequest, NextApiResponse } from "next";
import type { TKnowledgeConnectionResultsRequestBody, TKnowledgeConnectionResultsRequestResponse } from "./knowledge-connection-results.details";

import { maybeID } from "@/lib/consts/ids";
import KnowledgeConnectionModel from "@/lib/db/models/KnowledgeConnection.model";
import { HTTPBadRequest } from "@/lib/errors/HTTPErrors";
import Logger from "@/lib/loggers/Logger";
import { GET_KNOWLEDGE_CONNECTION_RESULTS } from "@/lib/loggers/LoggingEvents";

export default async function knowledgeConnectionResultsRoute(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const logger = new Logger().setEvent(GET_KNOWLEDGE_CONNECTION_RESULTS);
  try {
    // Fetch parameters from request
    const body = req.body as TKnowledgeConnectionResultsRequestBody;
    const knowledgeConnectionID = maybeID(req.query.knowledgeConnectionID);
    logger.setAdditionalData({
      requestData: {
        knowledgeConnectionID,
      }
    });
    if(knowledgeConnectionID == null) {
      throw new HTTPBadRequest("Route had a non-ID knowledge connection");
    }
    // Generate data models
    const connection = await KnowledgeConnectionModel.fetch(
      knowledgeConnectionID
    );
    const data = {
      strength: await connection.getStrength()
    } as TKnowledgeConnectionResultsRequestResponse;
    logger.setAdditionalData({
      responseData: {
        ...data
      }
    });
    res.status(200).json(data);
  } catch(error) {
    logger.setError(error);
  } finally {
    return logger.log();
  }
}
