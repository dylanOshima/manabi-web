import { db } from "src/db";
import type { ID } from "../../consts/ids";
import ModelBase from "./ModelBase";

export type TCourseData = {
  id: ID,
  title: string,
  description?: string,
  studentIDs: ID[],
  knowledgeIDs: ID[],
}

/**
 * Question model.
 */
export default class CourseModel extends ModelBase<TCourseData> {
  static type: "course";

  public static async fetch(
    id: ID,
  ) {
    await db.read();
    const data = db.query.get(CourseModel.type).filter({ id }).first().value();
    return new CourseModel(data);
  }

  public async save(
  ): Promise<void> {
    db.data[CourseModel.type].push();
    await db.write();
  }

}