import type { TQuestionData } from "@/lib/db/models/Question.model";

import { Text } from "@chakra-ui/react";
import PromptCard from "./feed_cards/PromptCard";

type Props = {
  questions: Array<TQuestionData>;
};

/*
 * Description of function
 * @param props
 */
export default function Feed({ questions }: Props) {
  return (
    <>
      {questions.map(({ id, text }) => (
        <PromptCard key={id}>{text}</PromptCard>
      ))}
      <Text
        color='gray'
        alignSelf='center'
      >
        Enter your response!
      </Text>
    </>
  );
}
