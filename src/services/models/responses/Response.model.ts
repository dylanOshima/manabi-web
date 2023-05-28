import type { ID } from "../../../consts/ids";
import ModelBase from "../ModelBase";

export type TResponseData<TInput> = {
  id: ID,
  questionID: ID,
  studentID: ID,
  // Raw user input in response to a target question
  userInput: TInput,
  // Evaluation on the user input
  evaluation?: TResponseEvaluation
  // Evaluation on the user input
  creationTime: number
}

export type TResponseEvaluation = {
  // Raw response from GPT evaluation
  raw: string
  // score of correctness (range from 0 to 1 where 1 is most correct and 0 is nothing correct)
  score: number,
  // Feedback items from GPT
  feedback: string[],
}

/**
 * Response instance model.
 * Interface for interacting with user answers from the backend.
 */
export default abstract class ResponseModel<TInput> extends ModelBase<TResponseData<TInput>> {

  /**
   * Parses the raw string response from the ML model into evaluation type.
   * @param output output from the ML model as a single string
   */
  public parse(raw: string): TResponseEvaluation {
    // TODO: Write proper response parsing
    return {
      raw,
      score: 0.7,
      feedback: ["Next time use more words.", "Could have used an excalmation point there!"]
    };
  }

}