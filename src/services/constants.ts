// Whether we're in development mode or not
export const IS_DEV_MODE = process.env.NODE_ENV === "development";

export enum HTTPStatusCodes {
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}