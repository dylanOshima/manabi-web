/**
 * Page for viewing the questions for a given piece of knowledge.
 */
import type { TKnowledgeData } from "@/services/models/Knowledge.model";
import type { GetServerSideProps } from "next/types";

import { Box, Button, Heading, useColorMode } from "@chakra-ui/react";
import { isNumber, toNumber } from "lodash";

import ChakraMarkdown from "@/components/ChakraMarkdown";
import { Container } from "@/components/Container";
import { DarkModeSwitch } from "@/components/DarkModeSwitch";
import { Main } from "@/components/Main";
import PromptCard from "@/components/feed_cards/PromptCard";
import { HTTPBadRequest } from "@/services/errors/HTTPErrors";
import KnowledgeModel from "@/services/models/Knowledge.model";
import { TQuestionData } from "@/services/models/Question.model";
import { useRouter } from "next/router";
import { useCallback } from "react";

type Props = {
  knowledge: TKnowledgeData;
  questions: Array<TQuestionData>;
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  params,
}) => {
  const { knowledgeID } = params;
  if (typeof knowledgeID !== "string" || isNumber(knowledgeID)) {
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
    },
  };
};

const KnowledgePage = ({ knowledge, questions = [] }: Props) => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  const router = useRouter();
  const onClick = useCallback(() => {
    router.push({
      pathname: `/study/`,
      query: {
        knowledgeID: knowledge.id,
        // TODO: We should store student in some session context and
        // derive the value from there.
        studentID: 0,
      },
    });
  }, [knowledge.id, router]);

  return (
    <Container height='100vh'>
      <Main>
        <Heading>Info</Heading>
        <ChakraMarkdown>{knowledge.text}</ChakraMarkdown>
        <Heading>Questions</Heading>
        <Box>
          <Button
            bgColor={isDark ? "green.800" : "green.200"}
            onClick={onClick}
          >
            Study!
          </Button>
        </Box>
        {questions.map(({ id, text }) => (
          <PromptCard key={id}>{text}</PromptCard>
        ))}
      </Main>
      <DarkModeSwitch />
    </Container>
  );
};

export default KnowledgePage;
