import { useCallback } from "react";

import { TQuestionData } from "@/lib/db/models/Question.model";
import { Heading, useCounter } from "@chakra-ui/react";
import StudyCard from "./StudyCard";

type Props = {
  questions: Array<TQuestionData>;
  onComplete: () => void;
};

/*
 * Card for studying
 */
export default function StudyCardStack({ questions, onComplete }: Props) {
  const maxQuestionIndex = questions.length - 1;
  const { valueAsNumber: currentQuestionIndex, increment } = useCounter({
    keepWithinRange: true,
    defaultValue: 0,
    min: 0,
    max: maxQuestionIndex,
  });
  const currentQuestion = questions[currentQuestionIndex];

  const onNext = useCallback(() => {
    if (currentQuestionIndex === maxQuestionIndex) {
      onComplete();
    }
    increment();
  }, [currentQuestionIndex, increment, maxQuestionIndex, onComplete]);

  return (
    <>
      <Heading>Study Session</Heading>
      <StudyCard
        index={currentQuestionIndex}
        question={currentQuestion}
        onNext={onNext}
      />
    </>
  );
}
