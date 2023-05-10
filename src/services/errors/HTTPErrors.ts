import { HTTPStatusCodes } from "../constants";
import BaseError from "./BaseError";

export class HTTPError extends BaseError {
  protected statusCode: HTTPStatusCodes;

  constructor({
    debugMessage,
    userMessage,
    name,
    statusCode,
    extraData
  }) {
    super(name, userMessage, debugMessage, extraData);
    this.statusCode = statusCode;
  }

  public serialize() {
    return {
      name: this.name,
      statusCode: this.statusCode,
      ...this.extraData,
      ...super.serialize(),
    }
  }
}

export class HTTPBadRequest extends HTTPError {
  constructor(debugMessage = null, extraData = null) {
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
  constructor(debugMessage = null, extraData = null) {
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
  constructor(debugMessage = null, extraData = null) {
    super({
      userMessage: 'Internal server error',
      debugMessage,
      name: "HttpInternalServerError",
      statusCode: HTTPStatusCodes.INTERNAL_SERVER_ERROR,
      extraData
    });
  }
}