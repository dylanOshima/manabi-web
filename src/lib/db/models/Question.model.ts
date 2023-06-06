import type { ExpChain } from "lodash";
import type { ID } from "../../consts/ids";

import { isNil } from "lodash";

import { SHOULD_SAVE_MONEY } from "@/lib/consts/globals";
import { db } from "@/lib/db";
import { TDB } from "@/lib/db/mock-db-data";
import BaseError from "@/lib/errors/BaseError";
import { sendPromptToOpenAI } from "../../../services/openai/openai";
import { genAnswerFeedbackPrompt } from "../../../services/openai/prompt_templates";
import Logger from "../../loggers/Logger";
import { OPENAI_API_SEND_PROMPT } from "../../loggers/LoggingEvents";
import ModelBase from "./ModelBase";
import TextResponseModel from "./responses/TextResponse.model";

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
   * @param response the provided answer to this question
   */
  public async genAnswer(
    response: TextResponseModel,
  ): Promise<TextResponseModel> {
    const logger = new Logger({
      response: response,
    }).setEvent(
      OPENAI_API_SEND_PROMPT
    );
    const knowledge = await response.getKnowledge();
    const prompt = genAnswerFeedbackPrompt(
      this.data.text,
      knowledge.data.text,
      response.data.userInput
    );
    logger.setAdditionalData({
      prompt
    });
    try {
      let feedback: string = "";
      if (!SHOULD_SAVE_MONEY) {
        const resp = await sendPromptToOpenAI(prompt);
        // Get the first response choice
        feedback = resp.data.choices[0].text ?? "";
      } else {
        feedback = `{
          "correctPoints": [
            "The student correctly identified that URL stands for Universal Resource Locator."
          ],
          "missedPoints": [
            "The student missed the information provided that URL stands for Uniform Resource Locator, not Universal Resource Locator."
          ]
        }`;
        logger.setAdditionalData({
          sentAPIRequest: false
        });
      }
      const parsedResponse = response.parse(feedback);
      logger.setAdditionalData({ parsedResponse });
      response.data.evaluation = parsedResponse;
      await response.save();
      return response;
    } catch (error) {
      if(error instanceof BaseError) {
        logger.setError(error);
      }
      throw error;
    } finally {
      logger.log();
    }
  }

}