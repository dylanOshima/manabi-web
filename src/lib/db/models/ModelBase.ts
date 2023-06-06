import type { ID } from "../../consts/ids";

/**
 * Base Model class with basic CRUD functionality.
 */
export default abstract class ModelBase<TData extends { id: ID }> {

  constructor(
    public readonly data: TData
  ) { }

  /**
   * Saves the current object in the target backend.
   */
  public abstract save(): Promise<void>;

  /**
   * Deletes the current object in the target backend.
   */
  public delete(): void {
    // TODO: Write delete to database  
    console.warn(`Deletion attempted for entity: (${this.constructor.name}: ${this.data.id})`);
  };

}