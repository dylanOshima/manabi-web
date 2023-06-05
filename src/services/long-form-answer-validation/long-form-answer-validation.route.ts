import type { NextApiRequest, NextApiResponse } from "next";
import { sendPromptToOpenAI } from "../openai/openai";
import answerParser from "../openai/response_handling/longAnswerParser";
import type { longFormAnswerValidationRequestBodyType } from "./long-form-answer-validation.details";
import { generatePrompt } from "./long-form-answer-validation.utils";

export async function longFormAnswerValidationRoute(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = req.body as longFormAnswerValidationRequestBodyType;

  try {
    // Prompt generation
    const prompt = generatePrompt(body);
    // LLM response
    const response = await sendPromptToOpenAI(prompt);
    // Response parser
    const output = answerParser(response.data.choices[0].text);
    res.status(200).json(output);
  } catch (error) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: "An error occurred during your request.",
        },
      });
    }
  }
}
