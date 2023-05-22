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
  1. Decide whether the student was correct
  2. Based on the text highlight any points that the student got correct
  3. Based on the text highlight any points the student might have missed 

  Text: ${context}

  Question: What is the main difference between monopolistic and perfectly competitive markets?

  Answer: the main difference between monopolistic and perfectly competitive markets is in the number of firms in the market. Monopolistic markets have only a single firm that dictates price and supply levels, whereas a perfectly competitive market has no one firm controlling the market.

  Evaluation: Correct. Correctly highlighted that monoplistic markets have a single firm that controls price and supply levels for goods and services. Highlighted that in a perfectly competitive market there are multiple players that equally control the market.

  Answer: there is no difference

  Evaluation: Incorrect. Should have highlighted that monoplistic markets have only one firm that controls the supply and price for goods and services. Should have highlighted that in contrast perfectly competitive markets have more than one firm where no one firm has full market control.

  Question: ${question}

  Answer: ${answer}

  Evaluation:
`.trim();