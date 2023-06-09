import withErrorHandling from "@/lib/utils/withErrorHandling";
import loginRoute from "@/services/auth/login.route";
import { NextApiRequest, NextApiResponse } from "next";

/**
 * API handler for dealing with answers from ChatGPT.
 */
function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      loginRoute(req, res);
      break;
  }
}

export default withErrorHandling(handler);
