import { Box, Text, Heading, Stack, StackDivider, Textarea, List, ListItem, ListIcon } from '@chakra-ui/react';
import * as React from 'react';
import BaseFeedCard from '../feed_cards/BaseFeedCard';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Flex, Spacer } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import ChakraMarkdown from '../ChakraMarkdown';
import { longFormAnswerValidationFetch } from '@/services/question-answering/question-answering.fetch';
import { TQuestionData } from '@/services/models/Question.model';

export type TResponseFeedback = {
  score: number,
  feedback: string[],
};

type Props = {
  question: TQuestionData,
  index: number,
  onNext: () => void,
};

/*
 * Card for studying
 */
export default function StudyCard({
  index,
  question,
  onNext
}: Props) {
  const { id: questionID, text: questionText } = question;
  const currentQuestionIndexRef = useRef(index);
  const [response, setResponse] = useState('');
  const [evaluation, setEvaluation] = useState<TResponseFeedback | null>();

  const hasSubmitted = evaluation != null;

  // When we get a new question, reset our current state.
  useEffect(() => {
    if (currentQuestionIndexRef.current !== index) {
      setResponse('')
      setEvaluation(null);
    }
  }, [index]);

  const onChange = useCallback(
    (e) => setResponse(e.target.value)
    , []
  );

  const onSubmit = useCallback(() =>
    longFormAnswerValidationFetch({
      questionID,
      // TODO: Replace with client side user data caching.
      studentID: 0,
      answer: response,
    }).then(({ evaluation }) =>
      setEvaluation({
        score: evaluation.score,
        feedback: evaluation.feedback,
      })
    ), [questionID, response]);

  return (
    <>
      <BaseFeedCard
        variant="elevated"
        border="medium"
        borderColor={response.length > 0 && 'green'}
      >
        <ChakraMarkdown>{questionText}</ChakraMarkdown>
      </BaseFeedCard>
      <BaseFeedCard
        variant="outline"
        colorScheme="whiteAlpha"
      >
        <Stack divider={<StackDivider />} spacing='4'>
          <Box>
            <Heading size='xs' textTransform='uppercase'>
              Response
            </Heading>
            {
              hasSubmitted ?
                <Text marginY={4}>
                  {response}
                </Text>
                : <Textarea
                  marginY={4}
                  placeholder="Write an answer"
                  resize="vertical"
                  value={response}
                  onChange={onChange}
                />
            }
          </Box>
          {hasSubmitted && (
            <Box>
              <Heading size='xs' textTransform='uppercase'>
                Evaluation
              </Heading>
              <List marginY={4} spacing={3}>
                {evaluation.feedback.map((item, index) => (
                  <ListItem key={index}>
                    <ListIcon as={CheckCircleIcon} color='green.500' />
                    {item}
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
        </Stack>
      </BaseFeedCard>
      <Flex minWidth='max-content' alignItems='center' gap='2'>
        <Spacer />
        {
          hasSubmitted ? (
            <Button colorScheme='green' onClick={onNext}>
              Next
            </Button>
          ) : (
            <Button colorScheme='green' onClick={onSubmit}>
              Submit
            </Button>
          )
        }
      </Flex>
    </>
  );
};