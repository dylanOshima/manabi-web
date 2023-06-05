import type { NextApiRequest, NextApiResponse } from "next";
import type { TKnowledgeConnectionRequestBody, TKnowledgeConnectionRequestResponse } from "./create-knowledge-connection.details";

import KnowledgeConnectionModel from "@/lib/db/models/KnowledgeConnection.model";
import { HTTPInternalServerError } from "@/lib/errors/HTTPErrors";
import Logger from "@/lib/loggers/Logger";

export default async function createKnowledgeConnectionRoute(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const logger = new Logger().setEvent("createKnowledgeConnectionRoute");
  try {
    const connectionInput = req.body as TKnowledgeConnectionRequestBody;
    logger.setAdditionalData({
      requestData: connectionInput,
    });
    const { data: connection } = await KnowledgeConnectionModel.create({
      responseIDs: [],
      strength: 0,
      ...connectionInput,
    });
    res.status(200).json({ connection } as TKnowledgeConnectionRequestResponse);

    return logger.setAdditionalData({
      responseData: {
        connection,
      }
    }).log();
  } catch (error) {
    logger.setError(error).log();
    throw new HTTPInternalServerError('Failed to handle route', {
      originalError: error,
    })
  }
}
