import BaseError from "../errors/BaseError";

/**
 * Basic logger
 */
export default class Logger {

  protected data: {
    errors: any[],
    event: string,
  } & object;

  constructor({ ...args } = {}) {
    this.data = {
      errors: [],
      event: "",
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

  public setError(error: unknown | Error): this {
    let errorData;
    if (typeof error === "string") {
      errorData = error;
    } else if (error instanceof BaseError) {
      errorData = error.serialize();
    } else if (error instanceof Error) {
      errorData = error.message;
    }
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