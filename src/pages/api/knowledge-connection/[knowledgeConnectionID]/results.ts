import withErrorHandling from '@/lib/utils/withErrorHandling';
import knowledgeConnectionResultsRoute from '@/services/knowledge-connection-results/knowledge-connection-results.route';
import { NextApiRequest, NextApiResponse } from 'next';

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