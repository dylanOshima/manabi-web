import type { NextApiRequest, NextApiResponse } from "next";

import ironConfig from "@/lib/auth/ironConfig";
import Logger from "@/lib/loggers/Logger";
import { LOGOUT as LOGOUT_EVENT } from "@/lib/loggers/LoggingEvents";
import { withIronSessionApiRoute } from "iron-session/next";

async function logoutRoute(req: NextApiRequest, res: NextApiResponse) {
  const logger = new Logger().setEvent(LOGOUT_EVENT).setAdditionalData({
    inputParams: req.body,
  });
  try {
    const viewer = req.session.viewer;
    if (viewer == null) {
      logger.setAdditionalData({
        notLoggedIn: true,
      });
      return req;
    }
    logger.setAdditionalData({
      viewer,
    });
    await req.session.destroy();
    res.status(200).json({
      ok: true,
    });
  } catch (error) {
    logger.setError(error);
  } finally {
    return logger.log();
  }
}

export default withIronSessionApiRoute(logoutRoute, ironConfig);
