/**
 * Page for creating a study session 
 */
import type { TKnowledgeData } from '@/services/models/Knowledge.model';
import type { GetServerSideProps } from 'next/types';

import { Heading, Text, useColorMode } from '@chakra-ui/react'

import { TQuestionData } from '@/services/models/Question.model'
import { Container } from '@/components/Container';
import { Main } from '@/components/Main';
import { DarkModeSwitch } from '@/components/DarkModeSwitch';
import PromptCard from '@/components/feed_cards/PromptCard';
import { maybeID } from 'src/consts/ids';
import { HTTPBadRequest } from '@/services/errors/HTTPErrors';
import KnowledgeConnectionModel from '@/services/models/KnowledgeConnection.model';
import KnowledgeModel from '@/services/models/Knowledge.model';

type Props = {
  knowledgeText: TKnowledgeData['text'],
  questions: Array<TQuestionData>,
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ query }) => {
  const knowledgeID = maybeID(query.knowledgeID);
  if (knowledgeID == null) {
    throw new HTTPBadRequest({
      debugMessage: `Passed IDs are invalid IDs: '${query}'.`,
    });
  }

  const knowledge = await KnowledgeModel.fetch(knowledgeID);

  const studentID = maybeID(query.studentID);
  if (studentID != null) {
    const knowledgeConnection = await KnowledgeConnectionModel.create({
      knowledgeID,
      studentID,
      responseIDs: []
    });
    return {
      redirect: {
        permanent: false,
        destination: `/study/${knowledgeConnection.data.id}`
      }
    }
  }

  return {
    props: {
      knowledgeText: knowledge.data.text,
      questions: await knowledge.getQuestionData(),
    }
  };
}

const StudyPage = ({ knowledgeText, questions = [] }: Props) => {
  const { colorMode } = useColorMode()
  const isDark = colorMode === 'dark';

  return (
    <Container height="100vh">
      <Main>
        <Heading>Study Session</Heading>
        <Text textAlign="center" color={`gray.${isDark ? "300" : "600"}`} fontSize='m'>{knowledgeText}</Text>
        <Heading>Questions</Heading>
        {questions.map(({ id, text }) => (
          <PromptCard key={id}>{text}</PromptCard>
        ))}
      </Main>
      <DarkModeSwitch />
    </Container>
  );
}

export default StudyPage;