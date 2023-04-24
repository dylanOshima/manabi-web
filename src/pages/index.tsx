import { Text } from '@chakra-ui/react'
import { Hero } from '../components/Hero'
import { Container } from '../components/Container'
import { Main } from '../components/Main'
import { DarkModeSwitch } from '../components/DarkModeSwitch'
import UserInput from '../components/UserInput'
import Feed from '../components/Feed'

const Index = () => (
  <Container height="100vh">
    <Hero
      title="Market Failure"
      module={
        <Text color="text">
          Economics
        </Text>
      }
    />
    <Main>
      <Feed />
    </Main>
    <DarkModeSwitch />
    <UserInput />
  </Container>
)

export default Index
