import type { NextApiRequest, NextApiResponse } from "next";
import { sendPromptToOpenAI } from "../openai/openai";
import type { longFormAnswerValidationRequestBodyType } from "./long-form-answer-validation.details";
import { generatePrompt } from "./long-form-answer-validation.utils";

export async function longFormAnswerValidationRoute(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = req.body as longFormAnswerValidationRequestBodyType;

  try {
    const completion = await sendPromptToOpenAI(generatePrompt(body));
    res.status(200).json({ result: completion.data.choices[0].text });
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
