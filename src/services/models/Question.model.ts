import type { ID } from "../CoreTypes";
import BasicLogger from "../loggers/BasicLogger";
import { sendPromptToOpenAI } from "../openai/openai";
import { genAnswerFeedbackPrompt } from "../openai/prompt_templates";
import ModelBase from "./ModelBase";
import TextResponseModel from "./responses/TextResponse.model";

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

  /**
   * Update the evaluation with an answer
   * @param answer the provided answer to this question
   */
  public async genAnswer(
    answer: TextResponseModel,
  ): Promise<TextResponseModel> {
    const prompt = genAnswerFeedbackPrompt(this.text, "WHERE IS THIS COMING FROM?", answer.data.userInput);
    try {
      const resp = await sendPromptToOpenAI(prompt);
      // Get the first response choice
      const feedback = resp.data.choices[0].text;
      const parsedResponse = answer.parse(feedback);
      answer.data.evaluation = parsedResponse;
      return answer;
    } catch (error) {
      (new BasicLogger()).setError(error).log();
      throw error;
    }
  }

}