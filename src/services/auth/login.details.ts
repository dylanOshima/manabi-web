import { TStudentData } from "@/lib/db/models/Student.model";

export const loginRouteURI = '/api/auth/login';

export type TLoginRequestBody = {
  email: TStudentData['email'],
  password: string,
};

export type TLoginResponse = {
  ok: true,
} | {
  ok: false,
  message: string,
};
