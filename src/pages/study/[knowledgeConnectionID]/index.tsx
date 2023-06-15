/**
 * Page for creating a study session
 */
import type { GetServerSideProps } from "next/types";

import Page from "@/components/Page";
import StudySessionCore from "@/components/learning/StudySessionCore";
import { maybeID } from "@/lib/consts/ids";
import KnowledgeModel, {
  TKnowledgeData,
} from "@/lib/db/models/Knowledge.model";
import KnowledgeConnectionModel from "@/lib/db/models/KnowledgeConnection.model";
import { TQuestionData } from "@/lib/db/models/Question.model";
import { HTTPBadRequest } from "@/lib/errors/HTTPErrors";

type Props = {
  questions: Array<TQuestionData>;
  knowledge: TKnowledgeData;
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  params,
}) => {
  const knowledgeConnectionID = maybeID(params?.knowledgeConnectionID);
  if (knowledgeConnectionID == null) {
    throw new HTTPBadRequest(
      `Passed knowledge connection ID '${knowledgeConnectionID}' is invalid`,
    );
  }
  const knowledgeConnection = await KnowledgeConnectionModel.fetch(
    knowledgeConnectionID,
  );
  const knowledge = await KnowledgeModel.fetch(
    knowledgeConnection.data.knowledgeID,
  );
  return {
    props: {
      questions: await knowledge.getQuestionData(),
      knowledge: knowledge.data,
    },
  };
};

const StudySessionPage = (props: Props) => {
  return (
    <Page>
      <StudySessionCore {...props} />
    </Page>
  );
};

export default StudySessionPage;
