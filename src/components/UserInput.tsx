import { Flex, Textarea, FormErrorMessage } from '@chakra-ui/react'
import { useCallback, useEffect, useState } from 'react'

import { Container } from './Container'
import { longFormAnswerValidationFetch } from '@/services/question-answering/question-answering.fetch';


export default function UserInput() {
  const [errorMessage, setErrorMessage] = useState('');
  const [value, setValue] = useState('');
  const handleChange = useCallback(
    event => setValue(event.target.value),
    []
  );

  const fetcher = useCallback(
    (answer: string) => longFormAnswerValidationFetch({
      questionID: "123456",
      answer
    }).then(data => console.log(data))
      .catch((err: Error) => setErrorMessage(err.message)),
    []
  )

  const onSubmit = useCallback(() => {
    setValue(""); // Clear value
    fetcher(value);
  }, [fetcher, value])

  // Listener for when the submit hotkey is pressed: `metaKey + return`
  useEffect(() => {
    const enterFunction = (event: KeyboardEvent) => {
      if (event.key === "Enter" && event.metaKey) {
        onSubmit()
      }
    };
    document.addEventListener("keydown", enterFunction, false);
    return () => {
      document.removeEventListener("keydown", enterFunction, false);
    };
  }, [onSubmit]);

  return (
    <Container
      flexDirection="row"
      width="full"
      alignItems="center"
      justifyContent="center"
      py={3}
      borderTop="2px solid gray"
    >
      <Flex width="65rem">
        <Textarea
          value={value}
          onChange={handleChange}
          placeholder='Enter your answer here'
          size='lg'
          resize="none"
          backgroundColor="white"
        />
        {errorMessage.length > 0 && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
      </Flex>
    </Container>
  )
}