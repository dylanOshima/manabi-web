import { TStudentData } from "@/lib/db/models/Student.model";

export const loginPageURI = "/auth/login";

export const loginRouteURI = "/api/" + loginPageURI;
export const logoutRouteURI = "/api/auth/logout";

export type TLoginRequestBody = {
  email: TStudentData["email"];
  password: string;
};

export type TLogoutRequestBody = {};

export type TLoginResponse =
  | {
      ok: true;
    }
  | {
      ok: false;
      message: string;
    };
