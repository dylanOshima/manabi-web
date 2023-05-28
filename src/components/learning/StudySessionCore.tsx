import { useEffect } from 'react';
import { useDisclosure } from '@chakra-ui/react';

import { TQuestionData } from '@/services/models/Question.model';
import { TKnowledgeData } from '@/services/models/Knowledge.model';
import KnowledgeModal from './KnowledgeModal';
import StudyCardStack from './StudyCardStack';

type Props = {
  questions: Array<TQuestionData>,
  knowledge: TKnowledgeData,
}

/*
 * Study session page
 */
export default function StudySessionCore({
  questions,
  knowledge
}: Props) {
  const {
    isOpen: isKnowledgeModalOpen,
    onClose: hideKnowledgeModal,
    onOpen: showKnowledgeModal
  } = useDisclosure({
    defaultIsOpen: true,
  });

  // Render the info modal
  useEffect(() => {
    showKnowledgeModal();
  }, [showKnowledgeModal]);

  return (
    <>
      <KnowledgeModal
        knowledge={knowledge}
        shouldShow={isKnowledgeModalOpen}
        onClose={hideKnowledgeModal}
      />
      <StudyCardStack questions={questions} />
    </>
  );
};