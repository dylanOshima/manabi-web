import { HTTPStatusCodes } from "../consts/HTTPStatusCodes";
import BaseError from "./BaseError";

export class HTTPError extends BaseError {
  protected statusCode: HTTPStatusCodes;

  constructor({
    debugMessage,
    userMessage,
    name,
    statusCode,
    extraData
  }: {
    debugMessage?: string | null,
    userMessage: string,
    name: string,
    statusCode: number,
    extraData?: object | null,
  }) {
    super(name, userMessage, debugMessage, extraData ?? undefined);
    this.statusCode = statusCode;
  }

  public serialize() {
    return {
      ...this.extraData,
      ...super.serialize(),
      statusCode: this.statusCode,
      name: this.name,
    }
  }
}

export class HTTPBadRequest extends HTTPError {
  constructor(debugMessage?: string, extraData?: object) {
    super({
      userMessage: 'Bad request',
      debugMessage,
      name: "HttpBadRequest",
      statusCode: HTTPStatusCodes.BAD_REQUEST,
      extraData
    });
  }
}

export class HTTPNotFound extends HTTPError {
  constructor(debugMessage?: string, extraData?: object) {
    super({
      userMessage: 'Not Found',
      debugMessage,
      name: "HttpNotFound",
      statusCode: HTTPStatusCodes.NOT_FOUND,
      extraData
    });
  }
}

export class HTTPInternalServerError extends HTTPError {
  constructor(debugMessage?: string, extraData?: object) {
    super({
      userMessage: 'Internal server error',
      debugMessage,
      name: "HttpInternalServerError",
      statusCode: HTTPStatusCodes.INTERNAL_SERVER_ERROR,
      extraData
    });
  }
}