/**
 * Page for viewing the questions in a passed course
 */

import { Text } from '@chakra-ui/react'

import { Container } from '@/components/Container';
import { Hero } from '@/components/Hero';
import { Main } from '@/components/Main';
import { DarkModeSwitch } from '@/components/DarkModeSwitch';
import UserInput from '@/components/UserInput';

type Props = {}

const CoursePage = (_props: Props) => (
  <Container height="100vh">
    <Hero
      title="Market Failure"
      module={
        <Text color="text">
          Course Selection
        </Text>
      }
    />
    <Main>
      <Text textAlign="center">
        Course Selection
      </Text>
      <UserInput />
    </Main>
    <DarkModeSwitch />
  </Container>
);

export default CoursePage;

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  }
}