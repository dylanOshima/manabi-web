import { NextApiResponse, NextApiRequest } from 'next'
import withErrorHandling from '../../utils/withErrorHandling';
import createKnowledgeConnectionRoute from '@/services/study-session/create-knowledge-connection.route';

/**
 * API handler for CRUD operations on KnowledgeConnections
 */
function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      createKnowledgeConnectionRoute(req, res);
      break;
  }
}

export default withErrorHandling(handler);