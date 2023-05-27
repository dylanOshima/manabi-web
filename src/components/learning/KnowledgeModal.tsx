import { TKnowledgeData } from '@/services/models/Knowledge.model';
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react';
import * as React from 'react';

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
        <ModalHeader>Review</ModalHeader>
        <ModalBody>
          <Text>{knowledgeText}</Text>
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