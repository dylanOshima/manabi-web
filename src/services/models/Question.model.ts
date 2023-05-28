import type { ID } from "../../consts/ids";
import type { ExpChain, } from "lodash";

import { isNil } from "lodash";

import { SHOULD_SAVE_MONEY } from "src/consts/globals";
import Logger from "../loggers/Logger";
import { sendPromptToOpenAI } from "../openai/openai";
import { genAnswerFeedbackPrompt } from "../openai/prompt_templates";
import ModelBase from "./ModelBase";
import TextResponseModel from "./responses/TextResponse.model";
import { OPENAI_API_SEND_PROMPT } from "../loggers/LoggingEvents";
import { db } from "src/db";
import { TDB } from "src/db/mock-db-data";

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

  public static type: "question" = "question";

  /**
   * Fetches an instance of the target model.
   * @param id the id of the instance to fetch
   */
  public static async fetch(
    id: ID,
  ) {
    await db.read();
    const data = db.query.get(QuestionModel.type).find({ id }).value();
    return new QuestionModel(data);
  }

  /**
   * Queries for all questions stored in the DB that are not undefined or null.
   * @returns ExpChain<TQuestionData>
   */
  public static async queryAll(
  ): Promise<ExpChain<TDB["question"]>> {
    await db.read();
    return db.query.get(QuestionModel.type).omitBy(isNil).values();
  }

  public async save(
  ): Promise<void> {
    db.data[QuestionModel.type].push(this.data);
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
    const logger = new Logger({
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