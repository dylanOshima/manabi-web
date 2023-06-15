import baseFetch from "@/services/baseFetch";
import {
  TStudentStudySessionsDataRequestBody,
  TStudentStudySessionsDataRequestResponse,
  studentSessionsURI,
} from "@/services/student/student-sessions/student-sessions.details";
import {
  Badge,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Stars from "../Stars";

type Props = {};

/**
 * What does this component do?
 */
const StudySessionsWidget = (_props: Props) => {
  const [knowledgeSessions, setKnowledgeSessions] =
    useState<TStudentStudySessionsDataRequestResponse>();

  useEffect(() => {
    baseFetch<
      TStudentStudySessionsDataRequestBody,
      TStudentStudySessionsDataRequestResponse
    >(studentSessionsURI, {}).then((knowledgeSessions) =>
      setKnowledgeSessions(knowledgeSessions),
    );
  }, []);

  return (
    <>
      <Heading size='lg'>Study Sessions</Heading>
      {knowledgeSessions?.map((knowledgeSession) => (
        <KnowledgeSessionCard
          key={knowledgeSession.knowledge.id}
          {...knowledgeSession}
        />
      ))}
    </>
  );
};

const KnowledgeSessionCard = ({
  knowledge,
  sessions,
}: TStudentStudySessionsDataRequestResponse[number]) => {
  const strength = Math.round(
    sessions.reduce(
      (strength, session) => strength + (session?.strength ?? 0),
      0,
    ) / sessions.length,
  );
  const strengthColorScheme =
    strength > 95
      ? "green"
      : strength > 65
      ? "yellow"
      : strength > 45
      ? "orange"
      : "red";

  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      variant='outline'
      size='md'>
      <Stack>
        <CardHeader>
          <Heading
            size='md'
            noOfLines={1}>
            {`Knowledge ${knowledge.id}`}
          </Heading>
        </CardHeader>
        <CardBody>
          <Text noOfLines={2}>{knowledge.text}</Text>
        </CardBody>
        <CardFooter>
          <Badge
            borderRadius='full'
            pt={1}
            pl={2}
            color='gray.500'
            fontWeight='semibold'
            fontSize='xs'
            textTransform='uppercase'>
            {sessions.length} sessions &nbsp;
          </Badge>
          <Spacer />
          <Text colorScheme='gray'>Strength: &nbsp;</Text>
          <Stars
            strength={strength}
            color={strengthColorScheme}
            boxSize={5}
          />
        </CardFooter>
      </Stack>
    </Card>
  );
};

export default StudySessionsWidget;
