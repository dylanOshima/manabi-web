import type { IronSessionOptions } from "iron-session/edge";

import { IS_DEV_MODE } from "../consts/globals";
import nullOrThrow from "../utils/nullOrThrow";

export const AUTH_COOKIE_NAME = "manabi_auth_cookie";

const password = nullOrThrow(process.env.COOKIE_PASSWORD);

const ironConfig: IronSessionOptions = {
  cookieName: AUTH_COOKIE_NAME,
  password,
  cookieOptions: {
    secure: !IS_DEV_MODE,
  },
};

export default ironConfig;