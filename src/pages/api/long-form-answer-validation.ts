import type { NextApiRequest, NextApiResponse } from "next";

import { longFormAnswerValidationHttpMethod } from "@/services/long-form-answer-validation/long-form-answer-validation.details";
import { longFormAnswerValidationRoute } from "@/services/long-form-answer-validation/long-form-answer-validation.route";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case longFormAnswerValidationHttpMethod:
      longFormAnswerValidationRoute(req, res);
      break;
  }
};

export const config = {
  api: {
    externalResolver: true,
    responseLimit: false,
  },
};

export default handler;
