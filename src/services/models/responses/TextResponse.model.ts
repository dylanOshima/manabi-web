import { db } from "src/db";
import type { ID } from "../../../consts/ids";
import ResponseModel from "./Response.model";
import { set } from "lodash";

/**
 * Text response instance model.
 * Handles text data
 */
export default class TextResponseModel extends ResponseModel<string> {

  public static type: "textResponse" = "textResponse";

  /**
   * Fetches an instance of the target model.
   * @param id the id of the instance to fetch
   */
  public static async fetch(
    id: ID,
  ) {
    await db.read();
    const data = db.query.get(TextResponseModel.type).filter({ id }).first().value();
    return new TextResponseModel(data);
  }

  public async save(
  ): Promise<void> {
    await db.read();
    db.data = set(
      db.data,
      `${TextResponseModel.type}[${this.data.id}]`,
      this.data
    );
    await db.write();
  }

  public static async create(
    dataFields: Omit<TextResponseModel['data'], 'id' | 'creationTime'>,
  ): Promise<TextResponseModel> {
    await db.read();
    const id = db.data[TextResponseModel.type].length;
    const data = {
      id,
      creationTime: Date.now(),
      ...dataFields,
    };
    db.data[TextResponseModel.type].push(data);
    await db.write();
    return new TextResponseModel(data);
  }

}