import type { ID } from "../../consts/ids";
import type { TDB } from "src/db/mock-db-data";
import type { ExpChain } from "lodash";

import { isNil, set } from 'lodash'

import { db } from "src/db";
import ModelBase from "./ModelBase";
import { NoDataFoundError } from "../errors/ModelErrors";

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

}