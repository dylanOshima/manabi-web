/**
 * Expected output after parsing
 */
export type TParserOutput = {};

/**
 * Abstract parser function type
 */
type TParser = (input: string) => TParserOutput; 

/**
 * Handles parsing of answers
 */
export default function parser(
  input: string,
  parser: TParser
): TParserOutput {
  try {
    return parser(input);
  } catch(error) {
    throw new Error(`Failed to parse input with param "${input}"`);
  }
}