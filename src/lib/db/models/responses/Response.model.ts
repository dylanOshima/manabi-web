import Logger from "@/lib/loggers/Logger";
import { OPENAI_VALIDATE_GPT_FEEDBACK } from "@/lib/loggers/LoggingEvents";
import type { ID } from "../../../consts/ids";
import KnowledgeModel from "../Knowledge.model";
import KnowledgeConnectionModel from "../KnowledgeConnection.model";
import ModelBase from "../ModelBase";

export type TResponseData<TInput> = {
  id: ID,
  questionID: ID,
  studentID: ID,
  knowledgeConnectionID: ID,
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
  feedback: {
    correctPoints: string[],
    missedPoints: string[],
  },
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
    const logger = new Logger().setEvent(OPENAI_VALIDATE_GPT_FEEDBACK)
    try {
      const feedback = JSON.parse(raw) as TResponseEvaluation['feedback'];
      const evaluation = {
        raw,
        // TODO: Heuristic for evaluating how correct a student was. Should be improved.
        score: feedback.correctPoints.length / (feedback.correctPoints.length + feedback.missedPoints.length),
        feedback,
      };
      logger.setAdditionalData({ success: true, evaluation });
      return evaluation;
    } catch (err) {
      logger.setAdditionalData({ success: false }).setError(err);
      throw err;
    } finally {
      logger.log();
    }
  }

  /**
   * Returns the knowledge that was prompted for this response.
   */
  public async getKnowledge(): Promise<KnowledgeModel> {
    const knowledgeConnection = await KnowledgeConnectionModel.fetch(this.data.knowledgeConnectionID);
    return await KnowledgeModel.fetch(knowledgeConnection.data.knowledgeID);
  }

}