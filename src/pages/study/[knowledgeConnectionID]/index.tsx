/**
 * Page for creating a study session 
 */
import type { GetServerSideProps } from 'next/types';

import { Main } from '@/components/Main';
import { TQuestionData } from '@/services/models/Question.model';
import { Container } from '@/components/Container';
import { DarkModeSwitch } from '@/components/DarkModeSwitch';
import { maybeID } from 'src/consts/ids';
import { HTTPBadRequest } from '@/services/errors/HTTPErrors';
import KnowledgeConnectionModel from '@/services/models/KnowledgeConnection.model';
import KnowledgeModel, { TKnowledgeData } from '@/services/models/Knowledge.model';
import StudySessionCore from '@/components/learning/StudySessionCore';

type Props = {
  questions: Array<TQuestionData>,
  knowledge: TKnowledgeData,
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ params }) => {
  const knowledgeConnectionID = maybeID(params.knowledgeConnectionID);
  if (knowledgeConnectionID == null) {
    throw new HTTPBadRequest({
      debugMessage: `Passed knowledge connection ID '${knowledgeConnectionID}' is invalid`,
    });
  }
  const knowledgeConnection = await KnowledgeConnectionModel.fetch(knowledgeConnectionID);
  const knowledge = await KnowledgeModel.fetch(knowledgeConnection.data.knowledgeID);
  return {
    props: {
      questions: await knowledge.getQuestionData(),
      knowledge: knowledge.data,
    }
  };
}

const StudySessionPage = (props: Props) => {
  return (
    <Container height="100vh">
      <Main>
        <StudySessionCore {...props} />
      </Main>
      <DarkModeSwitch />
    </Container>
  );
}

export default StudySessionPage;