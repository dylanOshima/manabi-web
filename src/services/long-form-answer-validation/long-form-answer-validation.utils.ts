import type { longFormAnswerValidationRequestBodyType } from "./long-form-answer-validation.details";

export function generatePrompt({
  question,
  answer,
  reference,
}: longFormAnswerValidationRequestBodyType) {
  return `Assume you are a teacher in an economics class grading long form student answers. The question is:${question} The reference information is here:${reference}. The student has answered:${answer}
Answer in the following structure: Grade:[GRADE OUT OF 10]/10. Correct: [YES/NO]. Feedback: [FEEDBACK]`;
}
