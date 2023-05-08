import type { ID } from "../CoreTypes";
import ModelBase from "./ModelBase";

/**
 * Question model.
 * Interface for interacting with questions from the backend.
 */
export default class QuestionModel extends ModelBase {

  constructor(
    public readonly id: ID,
    // public readonly course: Course,
    public readonly text: string,
    public readonly responseIDs: ID[],
    // public readonly questionType: TQuestionTypeEnum,
  ) {
    super(id);
  }

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
      "This is a test question?",
      [], // response IDs
    );
  }

}