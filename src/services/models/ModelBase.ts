import type { ID } from "../../consts/ids";

/**
 * Base Model class with basic CRUD functionality.
 */
export default abstract class ModelBase {

  constructor(
    public readonly id: ID,
  ) { }

  /**
   * Saves the current object in the target backend.
   */
  public save(): void {
    // TODO: Write save to database  
    console.warn(`Save attempted for entity: (${this.constructor.name}: ${this.id})`);
  };

  /**
   * Deletes the current object in the target backend.
   */
  public delete(): void {
    // TODO: Write delete to database  
    console.warn(`Deletion attempted for entity: (${this.constructor.name}: ${this.id})`);
  };

}