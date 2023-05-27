/**
 * Page for creating a study session 
 */
import type { TKnowledgeData } from '@/services/models/Knowledge.model';
import type { GetServerSideProps } from 'next/types';

import { Heading } from '@chakra-ui/react';

import { TQuestionData } from '@/services/models/Question.model';
import { Container } from '@/components/Container';
import { Main } from '@/components/Main';
import { DarkModeSwitch } from '@/components/DarkModeSwitch';
import PromptCard from '@/components/feed_cards/PromptCard';
import { maybeID } from 'src/consts/ids';
import { HTTPBadRequest } from '@/services/errors/HTTPErrors';
import KnowledgeConnectionModel from '@/services/models/KnowledgeConnection.model';
import KnowledgeModel from '@/services/models/Knowledge.model';

type Props = {
  questions: Array<TQuestionData>,
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ params }) => {
  const knowledgeConnectionID = maybeID(params.knowledgeConnectionID);
  if (knowledgeConnectionID == null) {
    throw new HTTPBadRequest({
      debugMessage: `Passed knowledge connection ID '${knowledgeConnectionID}' is invalid`,
    });
  }
  const knowledgeConnection = await KnowledgeConnectionModel.fetch(knowledgeConnectionID);
  const knowledge = await KnowledgeModel.fetch(knowledgeConnection.data.id);
  return {
    props: {
      questions: await knowledge.getQuestionData(),
    }
  };
}

const StudySessionPage = ({ questions }: Props) => {
  return (
    <Container height="100vh">
      <Main>
        <Heading>Learning</Heading>
        <Heading>Questions</Heading>
        {questions.map(({ id, text }) => (
          <PromptCard key={id}>{text}</PromptCard>
        ))}
      </Main>
      <DarkModeSwitch />
    </Container>
  );
}

export default StudySessionPage;