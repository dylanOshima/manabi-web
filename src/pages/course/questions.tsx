/**
 * Page for viewing the questions in a passed course
 */

import { Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

import { Container } from "@/components/Container";
import { DarkModeSwitch } from "@/components/DarkModeSwitch";
import Feed from "@/components/Feed";
import { Hero } from "@/components/Hero";
import { Main } from "@/components/Main";
import UserInput from "@/components/UserInput";
import QuestionModel, { TQuestionData } from "@/lib/db/models/Question.model";

type Props = {
  questions: Array<TQuestionData>;
};

const QuestionsPage = ({ questions = [] }: Props) => {
  const router = useRouter();
  return (
    <Container height='100vh'>
      <Hero
        title='Market Failure'
        module={<Text color='text'>Economics - {router.query.courseID}</Text>}
      />
      <Main>
        <Feed questions={questions} />
      </Main>
      <DarkModeSwitch />
      <UserInput />
    </Container>
  );
};

export default QuestionsPage;

export async function getStaticProps() {
  const questionsQuery = await QuestionModel.queryAll();
  const questions = questionsQuery.value();
  return {
    props: {
      questions,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: ["/course/[courseID]/questions"],
    fallback: true,
  };
}
