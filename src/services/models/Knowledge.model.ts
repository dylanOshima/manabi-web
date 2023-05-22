import type { ExpChain } from "lodash";
import type { ID } from "../../consts/ids";
import type { TDB } from "src/db/mock-db-data";

import { isNil } from 'lodash'
import { db } from "src/db";
import ModelBase from "./ModelBase";

export type TKnowledgeData = {
  id: ID,
  courseID: ID,
  text: string,
  questionIDs: ID[],
  // tagIDs: ID[]
}

/**
 * Knowledge model.
 */
export default class KnowledgeModel extends ModelBase<TKnowledgeData> {
  public static type: "knowledge" = "knowledge";

  public static async fetch(
    id: ID,
  ) {
    await db.read();
    const data = db.query.get(KnowledgeModel.type).filter({ id }).first().value();
    return new KnowledgeModel(data);
  }

  public async save(
  ): Promise<void> {
    db.data[KnowledgeModel.type].push();
    await db.write();
  }

  public static async queryAll(
  ): Promise<ExpChain<TDB["knowledge"]>> {
    await db.read();
    return db.query.get(KnowledgeModel.type).omitBy(isNil).values();
  }

}