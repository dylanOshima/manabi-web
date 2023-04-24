import { NextApiResponse, NextApiRequest } from 'next'
import withErrorHandling from '../utils/withErrorHandling';

/**
 * API handler for dealing with answers from ChatGPT.
 */
function handler(req: NextApiRequest, res: NextApiResponse) {
  return res.status(200).json({ name: 'John Doe' });
}

export default withErrorHandling(handler);