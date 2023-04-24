import { NextApiRequest, NextApiResponse } from "next/types";

const withErrorHandling = <TFunc extends (req: NextApiRequest, res: NextApiResponse) => any>(
  handler: TFunc,
) => (req: NextApiRequest, res: NextApiResponse) => {
  try {
    return handler(req, res);
  } catch(err) {
    if(process.env.NODE_ENV === "development") {
      console.error("An error occurred: ", err);
    }
    return res.status(500).json({ error: "Failed to handle request." });
  }
}

export default withErrorHandling;