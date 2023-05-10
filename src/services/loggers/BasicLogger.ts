import BaseError from "../errors/BaseError"

/**
 * Basic logger
 */
export default class BasicLogger {

  protected data;

  constructor(...args) {
    this.data = {
      errors: [],
      ...args,
    };
  }

  public setError(error: BaseError): this {
    const errorData = error.serialize();
    const existingErrors: Array<object> = this.data.errors ?? [];
    this.data.errors = [
      ...existingErrors,
      errorData
    ];
    return this;
  }

  public log(): void {
    console.log(
      "***** LOGGING CALL\n",
      this.data
    )
  }
}