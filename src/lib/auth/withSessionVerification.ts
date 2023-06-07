/**
 * Following IronSession quick start:
 * @docs https://github.com/vvo/iron-session#session-wrappers
 */

import type { NextRequest } from "next/server";

import { getIronSession } from "iron-session/edge";
import { NextResponse } from "next/server";

import { loginPageURI } from "@/services/auth/login.details";
import Logger from "../loggers/Logger";
import { AUTH_MIDDLEWARE_VERIFICATION } from "../loggers/LoggingEvents";
import AUTH_ROLES from "./authRoles";
import ironConfig from "./ironConfig";

declare module "iron-session" {
  interface IronSessionData {
    viewer?: {
      id: number;
      role: AUTH_ROLES
    };
  }
}

export const withSessionVerification = async (req: NextRequest, res: NextResponse) => {
  const logger = new Logger().setEvent(AUTH_MIDDLEWARE_VERIFICATION);
  const session = await getIronSession(req, res, ironConfig);

  const { viewer } = session;
  
  if (viewer == null) {
    logger.setAdditionalData({redirectReason: "no viewer found, redirecting to login page."});
    // Re-route to login page
    return NextResponse.redirect(new URL(loginPageURI, req.url));
  }
  
  logger.setAdditionalData({viewer});
  
  if (req.nextUrl.pathname.startsWith(loginPageURI)) {
    logger.setAdditionalData({redirectReason: "Viewer is already logged in."});
    // Re-route to home page
    return NextResponse.redirect(new URL('/', req.url));
  }

  logger.log();
  return res;
};