import { Button } from '@chakra-ui/react'
import NextLink from 'next/link'

import { Container } from '../components/Container'
import { Main } from '../components/Main'
import { DarkModeSwitch } from '../components/DarkModeSwitch'

const Index = () => (
  <Container height="100vh">
    <Main>
      <NextLink href={`/course`} passHref>
        <Button aria-label={'Button to view courses'}>
          Courses Page
        </Button>
      </NextLink>
      <NextLink href={`/study`} passHref>
        <Button aria-label={'Button to start a study session'}>
          Study Page
        </Button>
      </NextLink>
    </Main>
    <DarkModeSwitch />
  </Container>
)

export default Index;