import * as React from 'react';
import { useCallback } from 'react';

import { Button, ButtonGroup, Flex, Heading, Spacer, useCounter } from '@chakra-ui/react';
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
  const { text: questionText } = questions[currentQuestionIndex];

  const onSubmit = useCallback(() => {
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
        questionText={questionText}
      />
      <Flex minWidth='max-content' alignItems='center' gap='2'>
        <Spacer />
        <ButtonGroup gap='2'>
          <Button colorScheme='green' onClick={onSubmit}>
            Submit
          </Button>
        </ButtonGroup>
      </Flex>
    </>
  );
};