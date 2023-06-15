import BaseError from "./BaseError";

/**
 * Thrown when no data is found in the database.
 */
export class NoDataFoundError extends BaseError {
  constructor({
    debugMessage,
    extraData,
  }: {
    debugMessage: string,
    extraData?: object
  }) {
    const name = "No Data Found";
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