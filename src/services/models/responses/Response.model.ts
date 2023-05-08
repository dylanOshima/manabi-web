import type { ID } from "../../CoreTypes";
import ModelBase from "../ModelBase";

export type TResponse<TInput, TEvaluation> = {
  // Raw user input in response to a target question
  userInput: TInput,
  // Evaluation on the user input
  evaluation?: TEvaluation
}

export type TResponseEvaluation = {
  // Raw response from GPT evaluation
  raw: string
  // score of correctness (range from 0 to 1)
  score: number,
  // Feedback items from GPT
  feedback: string[],
}

/**
 * Response instance model.
 * Interface for interacting with user answers from the backend.
 */
export default abstract class ResponseModel<TInput> extends ModelBase {

  constructor(
    public readonly id: ID,
    public data: TResponse<TInput, TResponseEvaluation>,
    public readonly questionID: ID,
    // public readonly student: Student,
  ) {
    super(id);
  }

  /**
   * Parses the raw string response from the ML model into evaluation type.
   * @param output output from the ML model as a single string
   */
  public abstract parse(evaluation: string): TResponseEvaluation;

}