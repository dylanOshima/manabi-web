import { TQuestionAnsweringRequestResponse } from "./question-answering.details";
import { TQuestionAnsweringRequestBody, questionAnsweringRouteURI } from "./question-answering.details";

export const longFormAnswerValidationFetch = async (
  { questionID, answer }: TQuestionAnsweringRequestBody
) => {
  const uri = questionAnsweringRouteURI(questionID);
  const response = await fetch(uri, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ answer }),
  });

  if (response.status !== 200) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return (await response.json()) as TQuestionAnsweringRequestResponse;
};
