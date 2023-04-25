import { TAnswerValidationParserOutput } from "../response_handling/longAnswerParser";

export const longFormAnswerValidationUrl = "/api/long-form-answer-validation";

export const longFormAnswerValidationHttpMethod = "POST";

export type longFormAnswerValidationOnSuccessReturnType = TAnswerValidationParserOutput;

export type longFormAnswerValidationRequestBodyType = {
  question: string;
  answer: string;
  reference: string;
};