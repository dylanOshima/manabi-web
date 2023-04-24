export const longFormAnswerValidationUrl = "/api/long-form-answer-validation";

export const longFormAnswerValidationHttpMethod = "POST";

export type longFormAnswerValidationOnSuccessReturnType = {
  result: string;
};

export type longFormAnswerValidationRequestBodyType = {
  question: string;
  answer: string;
  reference: string;
};
