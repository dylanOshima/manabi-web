import { Flex, Textarea, FormErrorMessage } from '@chakra-ui/react'
import { useCallback, useEffect, useState } from 'react'

import { Container } from './Container'


export default function UserInput() {
  const [errorMessage, setErrorMessage] = useState('');
  const [value, setValue] = useState('');
  const handleChange = useCallback(
    event => setValue(event.target.value),
    []
  );

  const fetcher = useCallback(
    (input: string) => fetch("/api/answer")
      .then(resp => {
        if (resp.status === 200) {
          return resp.json();
        }
        setErrorMessage("Request failed with an error");
        if (process.env.NODE_ENV === "development") console.error(resp);
      })
      .then(data => console.log(data))
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