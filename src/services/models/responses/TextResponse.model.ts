import type { ID } from "../../CoreTypes";
import ResponseModel from "./Response.model";

/**
 * Text response instance model.
 * Handles text data
 */
export default class TextResponseModel extends ResponseModel<string> {

  /**
   * Fetches an instance of the target model.
   * @param id the id of the instance to fetch
   */
  public static fetch(
    id: ID,
  ) {
    // TODO: Write read from database
    return new this(
      id,
      { userInput: "This is a test response" },
      12345,
    );
  }

}