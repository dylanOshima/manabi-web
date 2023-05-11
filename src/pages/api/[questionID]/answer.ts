import { NextApiResponse, NextApiRequest } from 'next'
import withErrorHandling from '../../utils/withErrorHandling';
import answerValidationRoute from '@/services/question-answering/question-answering.route';

/**
 * API handler for dealing with answers from ChatGPT.
 */
function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      answerValidationRoute(req, res);
      break;
  }
}

export default withErrorHandling(handler);