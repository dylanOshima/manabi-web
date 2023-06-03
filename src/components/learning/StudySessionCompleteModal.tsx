import { TKnowledgeData } from '@/services/models/Knowledge.model';
import { Box, Button, Modal, ModalBody, Text, ModalContent, ModalFooter, ModalHeader, Spinner, Heading, SimpleGrid, Flex, useCounter } from '@chakra-ui/react';
import * as React from 'react';
import ChakraMarkdown from '../ChakraMarkdown';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';

type Props = {
  knowledge: TKnowledgeData,
};

/*
 * Informational modal for setting the context on the study session.
 */
export default function StudySessionCompleteModal({
  knowledge: {
    text: knowledgeText,
  },
}: Props) {
  const [results, setResults] = useState(true);

  const router = useRouter();
  const onClose = useCallback(() => {
    router.push('/study');
  }, [router]);

  return (
    <Modal isOpen={true} onClose={onClose} size="4xl" >
      <ModalContent padding={4}>
        <ModalHeader fontSize="4xl" alignSelf="center">🎉 Study Session Complete 🥳</ModalHeader>
        <ModalBody>
          {results == null
            ? <Flex alignSelf="center"><Spinner /></Flex>
            : <Results />
          }
        </ModalBody>
        <Button colorScheme='green' onClick={onClose}>
          Close
        </Button>
      </ModalContent>
    </Modal>
  );
};

const Results = ({ strength = 75 }) => {
  const {
    isAtMax,
    increment,
    value
  } = useCounter({
    defaultValue: 0,
    max: strength,
  });
  const intervalIDRef = useRef<number | null>();

  useEffect(() => {
    if (!isAtMax) {
      intervalIDRef.current = window.setInterval(increment, 100);
    } else {
      window.clearInterval(intervalIDRef.current);
    }
    return () => window.clearInterval(intervalIDRef.current);
  }, [increment, isAtMax])

  console.log(value);

  return (
    <Box textAlign="center" marginBottom={8}>
      <Text fontSize="4xl">Results: {value}%</Text>
    </Box>
  )
};