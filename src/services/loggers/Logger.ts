import BaseError from "../errors/BaseError"

/**
 * Basic logger
 */
export default class Logger {

  protected data;

  constructor({ ...args } = {}) {
    this.data = {
      errors: [],
      ...args,
    };
  }

  /**
   * Add additional data to the logging body. 
   * @param additionalData {...data}
   * @returns 
   */
  public setAdditionalData(additionalData: object): this {
    this.data = {
      ...this.data,
      ...additionalData
    }
    return this;
  }

  public setEvent(event: string): this {
    this.data.event = event;
    return this;
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
      "[LOG INFO] ",
      this.data
    )
  }
}