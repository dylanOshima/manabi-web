import { db } from "src/db";
import type { ID } from "../../consts/ids";
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
  static type: "knowledge";

  public static async fetch(
    id: ID,
  ) {
    await db.read();
    const data = db.query.get(KnowledgeModel.type).filter({ id }).first().value();
    return new KnowledgeModel(data);
  }

}