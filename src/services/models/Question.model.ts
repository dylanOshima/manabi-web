import { SHOULD_SAVE_MONEY } from "src/consts/globals";
import type { ID } from "../../consts/ids";
import BasicLogger from "../loggers/BasicLogger";
import { sendPromptToOpenAI } from "../openai/openai";
import { genAnswerFeedbackPrompt } from "../openai/prompt_templates";
import ModelBase from "./ModelBase";
import TextResponseModel from "./responses/TextResponse.model";
import { OPENAI_API_SEND_PROMPT } from "../loggers/LoggingEvents";
import { db } from "src/db";

export type TQuestionData = {
  id: ID,
  courseID: ID,
  text: string,
  responseIDs: ID[],
  knowledgeIDs: ID[],
  relatedQuestionIDs: ID[],
}

/**
 * Question model.
 * Interface for interacting with questions from the backend.
 */
export default class QuestionModel extends ModelBase<TQuestionData> {

  static type: "question";

  /**
   * Fetches an instance of the target model.
   * @param id the id of the instance to fetch
   */
  public static async fetch(
    id: ID,
  ) {
    await db.read();
    const data = db.query.get(QuestionModel.type).filter({ id }).first().value();
    return new QuestionModel(data);
  }

  public async save(
  ): Promise<void> {
    db.data[QuestionModel.type].push();
    await db.write();
  }

  /**
   * Update the evaluation with an answer
   * @param answer the provided answer to this question
   */
  public async genAnswer(
    answer: TextResponseModel,
  ): Promise<TextResponseModel> {
    const prompt = genAnswerFeedbackPrompt(this.data.text, "WHERE IS THIS COMING FROM?", answer.data.userInput);
    const logger = new BasicLogger({
      event: OPENAI_API_SEND_PROMPT,
    })
    try {
      let feedback: string = "";
      if (!SHOULD_SAVE_MONEY) {
        const resp = await sendPromptToOpenAI(prompt);
        // Get the first response choice
        feedback = resp.data.choices[0].text;
      } else {
        feedback = "Could have been better but honestly you were just wrong.";
        logger.setAdditionalData({
          sentAPIRequest: false
        });
      }
      const parsedResponse = answer.parse(feedback);
      answer.data.evaluation = parsedResponse;
      logger.log();
      return answer;
    } catch (error) {
      logger.setError(error).log();
      throw error;
    }
  }

}