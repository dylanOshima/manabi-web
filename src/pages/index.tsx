import Page from "@/components/Page";
import ModulesWidget from "@/components/widgets/ModulesWidget";
import StudySessionsWidget from "@/components/widgets/StudySessionsWidget";
import { Button, Flex } from "@chakra-ui/react";
import NextLink from "next/link";

const Index = () => (
  <Page>
    <Flex direction='row'>
      <NextLink
        href={`/course`}
        passHref>
        <Button
          aria-label={"Button to view courses"}
          mr={2}>
          Courses Page
        </Button>
      </NextLink>
      <NextLink
        href={`/study`}
        passHref>
        <Button
          aria-label={"Button to start a study session"}
          mr={2}>
          Study Page
        </Button>
      </NextLink>
    </Flex>
    <ModulesWidget />
    <StudySessionsWidget />
  </Page>
);

export default Index;
