import type { TQuestionAnsweringRequestResponse } from "./question-answering.details";
import type { TQuestionAnsweringRequestBody } from "./question-answering.details";

import { questionAnsweringRouteURI } from "./question-answering.details";

export const longFormAnswerValidationFetch = async (
  body: TQuestionAnsweringRequestBody
) => {
  const uri = questionAnsweringRouteURI(body.questionID);
  const response = await fetch(uri, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (response.status !== 200) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return (await response.json()) as TQuestionAnsweringRequestResponse;
};
