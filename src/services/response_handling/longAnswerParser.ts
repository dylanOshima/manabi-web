import type { TParserOutput } from "./parser";

export interface TAnswerValidationParserOutput extends TParserOutput {
  // How correct the answer was
  result: string,
  // Points to highlight
  highlights: string[],
  // Ways the student could improve 
  feedback: string,
};

/**
 * Handles parsing of answers
 */
export default function answerParser(input: string): TAnswerValidationParserOutput {
  const json = JSON.parse(input);
  return json as TAnswerValidationParserOutput;
}