import type {
  longFormAnswerValidationOnSuccessReturnType,
  longFormAnswerValidationRequestBodyType,
} from "./long-form-answer-validation.details";
import {
  longFormAnswerValidationHttpMethod,
  longFormAnswerValidationUrl,
} from "./long-form-answer-validation.details";

export const longFormAnswerValidationFetch = async (
  longFormAnswerValidationFetchParams: longFormAnswerValidationRequestBodyType
) => {
  const response = await fetch(longFormAnswerValidationUrl, {
    method: longFormAnswerValidationHttpMethod,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(longFormAnswerValidationFetchParams),
  });

  const data =
    (await response.json()) as longFormAnswerValidationOnSuccessReturnType;
  if (response.status !== 200) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return data.result;
};
