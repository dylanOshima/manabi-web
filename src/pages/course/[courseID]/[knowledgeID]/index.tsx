/**
 * Page for viewing the questions for a given piece of knowledge.
 */
import type { GetServerSideProps } from 'next/types';
import type { TKnowledgeData } from '@/services/models/Knowledge.model';

import { Button, Heading, Text, useColorMode } from '@chakra-ui/react'
import { isNumber, toNumber } from 'lodash';

import { TQuestionData } from '@/services/models/Question.model'
import { Container } from '@/components/Container';
import { Main } from '@/components/Main';
import { DarkModeSwitch } from '@/components/DarkModeSwitch';
import { HTTPBadRequest } from '@/services/errors/HTTPErrors';
import KnowledgeModel from '@/services/models/Knowledge.model';
import PromptCard from '@/components/feed_cards/PromptCard';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

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

const KnowledgePage = ({ knowledge, questions = [] }: Props) => {
  const { colorMode } = useColorMode()
  const isDark = colorMode === 'dark';

  const router = useRouter();
  const onClick = useCallback(() => {
    router.push({
      pathname: `/study/`,
      query: {
        knowledgeID: knowledge.id,
        // TODO: We should store student in some session context and
        // derive the value from there.
        studentID: 0,
      }
    });
  }, [knowledge.id, router]);

  return (
    <Container height="100vh">
      <Main>
        <Heading>Info</Heading>
        <Text
          textAlign="center"
          color={`gray.${isDark ? "300" : "600"}`}
          fontSize='m'>
          {knowledge.text}
        </Text>
        <Heading>Questions</Heading>
        <Button bgColor={isDark ? "green.800" : "green.200"} onClick={onClick}>
          Study!
        </Button>
        {questions.map(({ id, text }) => (
          <PromptCard key={id}>{text}</PromptCard>
        ))}
      </Main>
      <DarkModeSwitch />
    </Container>
  );
}

export default KnowledgePage;