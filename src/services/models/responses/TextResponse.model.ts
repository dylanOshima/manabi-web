import type { ID } from "../../CoreTypes";
import ResponseModel, { TResponseEvaluation } from "./Response.model";

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

  public parse(raw: string): TResponseEvaluation {
    // TODO: Write proper response parsing
    const fakeEvaluation = {
      raw,
      score: 0.7,
      feedback: ["Next time use more words.", "Could have used an excalmation point there!"]
    };
    this.data.evaluation = fakeEvaluation;
    return fakeEvaluation;
  }

}