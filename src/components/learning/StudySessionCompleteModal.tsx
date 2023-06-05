import { knowledgeConnectionResultsFetch } from "@/services/knowledge-connection-results/knowledge-connection-results.fetch";
import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Spinner,
  Text,
  useCounter,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import { ID } from "src/consts/ids";

type Props = {};

/*
 * Informational modal for setting the context on the study session.
 */
export default function StudySessionCompleteModal(_props: Props) {
  const [results, setResults] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const router = useRouter();
  const onClose = useCallback(() => {
    router.push("/study");
  }, [router]);

  const knowledgeConnectionID = ID(router.query.knowledgeConnectionID);
  useEffect(() => {
    knowledgeConnectionResultsFetch(knowledgeConnectionID, {
      // TODO: Replace with actual user ID
      studentID: 0,
    })
      .then((strength) => setResults(strength))
      .catch((err) => setErrorMessage(err));
  }, [knowledgeConnectionID]);

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      size='4xl'
    >
      <ModalContent padding={4}>
        <ModalHeader
          fontSize='4xl'
          alignSelf='center'
        >
          🎉 Study Session Complete 🥳
        </ModalHeader>
        <ModalBody>
          {results == null ? (
            <Loading />
          ) : errorMessage != null ? (
            <Error errorMessage={errorMessage} />
          ) : (
            <Results results={results} />
          )}
        </ModalBody>
        <Button
          colorScheme='green'
          onClick={onClose}
        >
          Close
        </Button>
      </ModalContent>
    </Modal>
  );
}

const Results = ({ results = 0.75 }) => {
  // strength is a decinmal, thus converting it to a percentage.
  const resultsPercentage = Math.round(results * 100);
  const { isAtMax, increment, value } = useCounter({
    defaultValue: 0,
    max: resultsPercentage,
  });
  const intervalIDRef = useRef<number | null>();

  useEffect(() => {
    if (!isAtMax) {
      intervalIDRef.current = window.setInterval(increment, 100);
    } else {
      window.clearInterval(intervalIDRef.current);
    }
    return () => window.clearInterval(intervalIDRef.current);
  }, [increment, isAtMax]);

  return (
    <Box
      textAlign='center'
      marginBottom={8}
    >
      <Text fontSize='4xl'>Results: {resultsPercentage}%</Text>
    </Box>
  );
};

const Error = ({ errorMessage }) => (
  <Box
    textAlign='center'
    marginBottom={8}
  >
    <Text fontSize='4xl'>An error occurred</Text>
    <Text>{errorMessage}</Text>
  </Box>
);

const Loading = () => (
  <Flex alignSelf='center'>
    <Spinner />
  </Flex>
);
