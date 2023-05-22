import type { ID } from "../../consts/ids";

import ModelBase from "./ModelBase";
import { db } from "src/db";

export type TStudentData = {
  id: ID,
  email: string,
  firstName: string,
  lastName: string,
  passwordHash: string,
  courseIDs: ID[],
  // knowledgeIDs: [],
  // responseIDs: []
}

/**
 * Student model.
 */
export default class StudentModel extends ModelBase<TStudentData> {

  public static type: "student" = "student";

  /**
   * Fetches an instance of the target model.
   * @param id the id of the instance to fetch
   */
  public static async fetch(
    id: ID,
  ) {
    await db.read();
    const data = db.query.get(StudentModel.type).find({ id }).value();
    return new StudentModel(data);
  }

  public async save(
  ): Promise<void> {
    db.data[StudentModel.type].push(this.data);
    await db.write();
  }
}