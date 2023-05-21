import { db } from "src/db";
import type { ID } from "../../../consts/ids";
import ResponseModel from "./Response.model";

/**
 * Text response instance model.
 * Handles text data
 */
export default class TextResponseModel extends ResponseModel<string> {

  static type: "textResponse";

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

}