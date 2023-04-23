import { Flex, Textarea } from '@chakra-ui/react'
import { useCallback, useState } from 'react'

import { Container } from './Container'

export default function UserInput() {
  const [value, setValue] = useState('')
  const handleChange = useCallback(
    (event) => setValue(event.target.value),
    []
  );

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
      </Flex>
    </Container>
  )
}