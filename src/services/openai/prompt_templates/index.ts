/**
 * Generate a prompt to evaluate a student's answer to a particular question.
 */
export const genAnswerFeedbackPrompt = (
  /**
   * Question the student was prompted and with which we want to evaluate.
   * 
   * Ex.
   * ```
   * What is the main difference between monopolistic and perfectly competitive markets?
   * ```
   */
  question: string,
  /**
   * Contextual knowledge that we're using to evaluate a correct response.
   * 
   * Ex.
   * ```
   * A monopolistic market and a perfectly competitive market are two market structures that have
   * several key distinctions in terms of market share, price control, and barriers to entry. In
   * a monopolistic market, there is only one firm that dictates the price and supply levels of
   * goods and services, and that firm has total market control. In contrast to a monopolistic market,
   * a perfectly competitive market is composed of many firms, where no one firm has market control.
   * ```
   */
  context: string,
  /**
   * User supplied answer
   * 
   * Ex:
   * ```
   * Monoplistic markets have many firms controlling the market, and perfect competition markets
   * have a single firm that controls it.
   * ```
   */
  answer: string
) => `
  You are a professor evaluating an answer your student gave. You need to:
  - determine your confidence that the student understood the concept
  - provide feedback on ways the student could improve their answer
  - highlight what parts of the student's answer was correct

  Let's do it step by step when evaluating an answer:
  1. Based on the text, highlight any points that the student got correct.
  2. Based on the text, highlight any points the student might have missed. 

  Write feedback addressed to the student. Feedback should be in a JSON response
  in the form of:
  {
    "correctPoints": // An array of strings
    "missedPoints": // An array of strings
  }

  This is the information the student was provided: "${context}"
  
  The student was then asked: "${question}"

  The student responded with: "${answer}"

  What is your feedback?
`.trim();