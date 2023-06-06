import BaseError from "./BaseError";

/**
 * Thrown when the passed input is not what is expected.
 */
export class InvalidInputError extends BaseError {
  constructor({
    debugMessage,
    extraData,
  }: {
    debugMessage?: string,
    extraData?: object,
  }) {
    const name = "Invalid input passed.";
    const userMessage = "An internal error has occurred.";
    super(name, userMessage, debugMessage, extraData);
  }

  public serialize() {
    return {
      ...this.extraData,
      ...super.serialize(),
      name: this.name,
    }
  }
}