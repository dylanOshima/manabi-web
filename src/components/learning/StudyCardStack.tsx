import type { TResponseFeedback } from './StudyCard';

import * as React from 'react';
import { useCallback, useState } from 'react';

import { Heading, useCounter } from '@chakra-ui/react';
import { TQuestionData } from '@/services/models/Question.model';
import StudyCard from './StudyCard';

type Props = {
  questions: Array<TQuestionData>,
};

/*
 * Card for studying
 */
export default function StudyCardStack({
  questions
}: Props) {
  const maxQuestionIndex = questions.length - 1;
  const { valueAsNumber: currentQuestionIndex, increment } = useCounter({
    keepWithinRange: true,
    defaultValue: 0,
    min: 0,
    max: maxQuestionIndex
  });
  const currentQuestion = questions[currentQuestionIndex];

  const onNext = useCallback(() => {
    if (currentQuestionIndex === maxQuestionIndex) {
      alert("Complete!");
    }
    increment();
  }, [currentQuestionIndex, increment, maxQuestionIndex]);

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
};