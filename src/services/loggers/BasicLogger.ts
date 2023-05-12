import BaseError from "../errors/BaseError"

/**
 * Basic logger
 */
export default class BasicLogger {

  protected data;

  constructor({ ...args } = {}) {
    this.data = {
      errors: [],
      ...args,
    };
  }

  public setAdditionalData(additionalData: object): this {
    if ('additionalData' in this.data) {
      this.data.additionalData = {
        ...this.data.additionalData,
        additionalData,
      }
    } else {
      this.data.additionalData = additionalData;
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
      "[LOG INFO]\n",
      this.data
    )
  }
}