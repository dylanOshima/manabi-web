/**
 * Page for viewing the questions for a given piece of knowledge.
 */
import type { GetServerSideProps } from 'next/types';
import type { TKnowledgeData } from '@/services/models/Knowledge.model';

import { Heading, Text } from '@chakra-ui/react'
import { isNumber, toNumber } from 'lodash';

import { TQuestionData } from '@/services/models/Question.model'
import { Container } from '@/components/Container';
import { Main } from '@/components/Main';
import Feed from '@/components/Feed';
import { DarkModeSwitch } from '@/components/DarkModeSwitch';
import UserInput from '@/components/UserInput';
import { HTTPBadRequest } from '@/services/errors/HTTPErrors';
import KnowledgeModel from '@/services/models/Knowledge.model';
import PromptCard from '@/components/feed_cards/PromptCard';

type Props = {
  knowledge: TKnowledgeData,
  questions: Array<TQuestionData>,
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ params }) => {
  const { knowledgeID } = params;
  if (typeof knowledgeID !== 'string' || isNumber(knowledgeID)) {
    throw new HTTPBadRequest({
      debugMessage: `Passed knowledge ID '${knowledgeID}' is invalid`,
    });
  }
  const knowledgeModel = await KnowledgeModel.fetch(toNumber(knowledgeID));
  const questions = await knowledgeModel.getQuestionData();
  return {
    props: {
      knowledge: knowledgeModel.data,
      questions,
    }
  };
}

const QuestionsPage = ({ knowledge, questions = [] }: Props) => {
  return (
    <Container height="100vh">
      <Main>
        <Heading>Info</Heading>
        <Text textAlign="center" color="gray.600" fontSize='m'>{knowledge.text}</Text>
        <Heading>Questions</Heading>
        {questions.map(({ id, text }) => (
          <PromptCard key={id}>{text}</PromptCard>
        ))}
      </Main>
      <DarkModeSwitch />
    </Container>
  );
}

export default QuestionsPage;