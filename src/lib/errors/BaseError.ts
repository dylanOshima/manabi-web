import { IS_DEV_MODE } from "../consts/globals";

/**
 * General purpose error with a user facing message or an dev facing message.
 */
export default class BaseError extends Error {

  constructor(
    // Name of the error
    public name: string,
    // Message shown to the user
    protected userMessage: string,
    // Message shown in the dev tier for easier debugging.
    protected debugMessage?: string | null,
    // Misc. data
    protected extraData: object = {},
  ) {
    super(
      IS_DEV_MODE ? userMessage : (debugMessage ?? userMessage)
    );
    Error.captureStackTrace(this, BaseError);
  }

  public serialize() {
    return {
      name: this.name,
      userMessage: this.userMessage,
      debugMessage: this.debugMessage,
      stackTrace: this.stack,
      extraData: this.extraData,
    };
  }
}