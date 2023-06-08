/**
 * Page for viewing the questions in a passed course
 */

import { Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

import Feed from "@/components/Feed";
import { Hero } from "@/components/Hero";
import { Main } from "@/components/Main";
import Page from "@/components/Page";
import UserInput from "@/components/UserInput";
import QuestionModel, { TQuestionData } from "@/lib/db/models/Question.model";

type Props = {
  questions: Array<TQuestionData>;
};

const QuestionsPage = ({ questions = [] }: Props) => {
  const router = useRouter();
  return (
    <Page
      header={
        <Hero
          title='Market Failure'
          module={<Text color='text'>Economics - {router.query.courseID}</Text>}
        />
      }
      footer={<UserInput />}
    >
      <Main>
        <Feed questions={questions} />
      </Main>
    </Page>
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
