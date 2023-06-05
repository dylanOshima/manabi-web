import knowledgeConnectionResultsRoute from '@/services/knowledge-connection-results/knowledge-connection-results.route';
import { NextApiRequest, NextApiResponse } from 'next';
import withErrorHandling from 'src/utils/withErrorHandling';

/**
 * API handler for dealing with answers from ChatGPT.
 */
function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      knowledgeConnectionResultsRoute(req, res);
      break;
  }
}

export default withErrorHandling(handler);