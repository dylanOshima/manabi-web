import type { TDB } from "@/lib/db/mock-db-data";
import type { ExpChain } from "lodash";
import type { ID } from "../../consts/ids";
import type { TQuestionData } from "./Question.model";

import { db } from "@/lib/db";
import { includes, isNil } from 'lodash';
import { NoDataFoundError } from "../../errors/ModelErrors";
import ModelBase from "./ModelBase";
import QuestionModel from "./Question.model";

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
    if (data == null) {
      throw new NoDataFoundError({
        debugMessage: "No data found when fetchiing for 'knowledge' from DB."
      });
    }
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

  public async getQuestionData(): Promise<Array<TQuestionData>> {
    await db.read();
    const questionsQuery = await QuestionModel.queryAll();
    return questionsQuery
      .filter(({ id: questionID }) => includes(this.data.questionIDs, questionID))
      .value();
  }

}