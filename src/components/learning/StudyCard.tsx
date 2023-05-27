import { Textarea } from '@chakra-ui/react';
import * as React from 'react';
import BaseFeedCard from '../feed_cards/BaseFeedCard';
import { useCallback, useEffect, useRef, useState } from 'react';

type Props = {
  index: number,
  questionText: string,
};

/*
 * Card for studying
 */
export default function StudyCard({
  index,
  questionText,
}: Props) {
  const [response, setResponse] = useState('');
  const currentQuestionIndexRef = useRef(index);

  useEffect(() => {
    if (currentQuestionIndexRef.current !== index) {
      setResponse('')
    }
  }, [index])

  return (
    <>
      <BaseFeedCard
        variant="elevated"
        border="medium"
        borderColor={response.length > 0 && 'green'}
      >
        {questionText}
      </BaseFeedCard>
      <Textarea
        display="block"
        marginBottom="20px"
        placeholder="Write an answer"
        resize="vertical"
        value={response}
        onChange={useCallback(
          (e) => setResponse(e.target.value)
          , []
        )}
      />
    </>
  );
};