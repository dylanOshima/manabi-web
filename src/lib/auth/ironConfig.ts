import type { IronSessionOptions } from 'iron-session/edge';

import { IS_DEV_MODE } from "../consts/globals";
import nullOrThrow from "../utils/nullOrThrow";

const COOKIE_NAME = "manabi_auth_cookie";
const password = nullOrThrow(process.env.COOKIE_PASSWORD);

const ironConfig: IronSessionOptions = {
    cookieName: COOKIE_NAME,
    password,
    cookieOptions: {
      secure: !IS_DEV_MODE,
    },
}

export default ironConfig