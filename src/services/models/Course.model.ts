import type { ID } from "../../consts/ids";
import type { ExpChain } from 'lodash';
import type { TKnowledgeData } from "./Knowledge.model";

import { db } from "src/db";
import ModelBase from "./ModelBase";
import { isNil } from "lodash";
import { TDB } from "src/db/mock-db-data";
import KnowledgeModel from "./Knowledge.model";

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
  public static type: "course" = "course";

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

  public static async queryAll(
  ): Promise<ExpChain<TDB["course"]>> {
    await db.read();
    return db.query.get(CourseModel.type).omitBy(isNil).values();
  }

  public async getKnowledgeData(
  ): Promise<Array<TKnowledgeData>> {
    const knowledgeQuery = await KnowledgeModel.queryAll();
    return knowledgeQuery.filter({ courseID: this.data.id }).value();
  }

}