import type { TDB } from "@/lib/db/mock-db-data";
import { ExpChain } from "lodash";
import type { ID } from "../../consts/ids";

import { isNil, set } from 'lodash';

import { db } from "@/lib/db";
import { NoDataFoundError } from "../../errors/ModelErrors";
import ModelBase from "./ModelBase";
import TextResponseModel from "./responses/TextResponse.model";

export type TKnowledgeConnectionData = {
  id: ID,
  knowledgeID: ID,
  studentID: ID,
  responseIDs: ID[],
  strength?: number,
}

/**
 * Knowledge Connection model.
 */
export default class KnowledgeConnectionModel extends ModelBase<TKnowledgeConnectionData> {
  public static type: "knowledgeConnection" = "knowledgeConnection";

  public static async fetch(
    id: ID,
  ) {
    await db.read();
    const data = db.query.get(KnowledgeConnectionModel.type).filter({ id }).first().value();
    if (data == null) {
      throw new NoDataFoundError({
        debugMessage: "No data found when fetchiing for 'knowledge' from DB."
      });
    }
    return new KnowledgeConnectionModel(data);
  }

  public async save(
  ): Promise<void> {
    await db.read();
    db.data = set(db.data, `${KnowledgeConnectionModel.type}[${this.data.id}]`, this.data);
    await db.write();
  }

  public static async create(
    dataFields: Omit<TKnowledgeConnectionData, 'id'>,
  ): Promise<KnowledgeConnectionModel> {
    await db.read();
    const id = db.data[KnowledgeConnectionModel.type].length;
    const data = {
      id,
      ...dataFields,
    };
    db.data[KnowledgeConnectionModel.type].push(data);
    await db.write();
    return new KnowledgeConnectionModel(data);
  }

  public static async queryAll(
  ): Promise<ExpChain<TDB["knowledgeConnection"]>> {
    await db.read();
    return db.query.get(KnowledgeConnectionModel.type).omitBy(isNil).values();
  }

  /**
   * Returns the student's strength on the given piece of knowledge. Where strength indicates
   * how confident we are that the student understands the Knowledge associated with 
   * this connection.
   * 
   * @docs docs/strength-algorithm-v1.pdf
   * 
   * @returns strength
   */
  public async getStrength(): Promise<number> {
    const responses = await Promise.all(
      this.data.responseIDs.map(
        async responseID => await TextResponseModel.fetch(responseID)
      )
    );
    const correctness = responses.reduce((strength, response) => {
      const evaluation = response.data.evaluation;
      if(evaluation == null) {
        // Ignore responses that have not been evaluated
        return strength;
      }
      return strength + evaluation.score;
    }, 0);
    return correctness / responses.length;
  }

}