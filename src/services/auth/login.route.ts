import type { NextApiRequest, NextApiResponse } from "next";

import { withIronSessionApiRoute } from "iron-session/next";

import AUTH_ROLES from "@/lib/auth/authRoles";
import getUserFromCredentials from "@/lib/auth/getUserFromCredentials";
import ironConfig from "@/lib/auth/ironConfig";
import Logger from "@/lib/loggers/Logger";
import { LOGIN as LOGIN_EVENT } from "@/lib/loggers/LoggingEvents";
import { TLoginRequestBody } from "./loginLogout.details";

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  const logger = new Logger().setEvent(LOGIN_EVENT).setAdditionalData({
    inputParams: req.body,
  });
  try {
    const { email, password } = req.body as TLoginRequestBody;
    const student = await getUserFromCredentials(email, password);
    if (student == null) {
      logger
        .setAdditionalData({
          noStudentFound: true,
        })
        .log();
      res.status(200).json({
        ok: false,
        message: "No student was found.",
      });
      return;
    }
    // get user from database then:
    req.session.viewer = {
      id: student.data.id,
      role: AUTH_ROLES.LOGGED_IN,
    };
    await req.session.save();
    logger.setAdditionalData({
      student: student.data,
    });
    res.status(200).json({
      ok: true,
    });
  } catch (error) {
    logger.setError(error);
  } finally {
    return logger.log();
  }
}

export default withIronSessionApiRoute(loginRoute, ironConfig);
