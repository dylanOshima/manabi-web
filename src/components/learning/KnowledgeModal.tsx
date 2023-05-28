import { TKnowledgeData } from '@/services/models/Knowledge.model';
import { Box, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@chakra-ui/react';
import * as React from 'react';
import ChakraMarkdown from '../ChakraMarkdown';

type Props = {
  knowledge: TKnowledgeData,
  shouldShow: boolean,
  onClose: () => void,
};

/*
 * Informational modal for setting the context on the study session.
 */
export default function KnowledgeModal({
  knowledge: {
    text: knowledgeText,
  },
  shouldShow,
  onClose,
}: Props) {

  return (
    <Modal isOpen={shouldShow} onClose={onClose} size="full" >
      <ModalContent>
        <ModalHeader fontSize="4xl">Review</ModalHeader>
        <ModalBody>
          <Box>
            <ChakraMarkdown>{knowledgeText}</ChakraMarkdown>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='green' mr={3} onClick={onClose}>
            Start
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};