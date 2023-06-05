import { useDisclosure } from "@chakra-ui/react";
import { useCallback } from "react";

import { TKnowledgeData } from "@/lib/db/models/Knowledge.model";
import { TQuestionData } from "@/lib/db/models/Question.model";
import KnowledgeModal from "./KnowledgeModal";
import StudyCardStack from "./StudyCardStack";
import StudySessionCompleteModal from "./StudySessionCompleteModal";
import {
  StudySessionProgressStates,
  useStudySessionProgressState,
} from "./StudySessionProgressState";

type Props = {
  questions: Array<TQuestionData>;
  knowledge: TKnowledgeData;
};

/*
 * Study session page
 */
export default function StudySessionCore({ questions, knowledge }: Props) {
  const { currentState, nextState } = useStudySessionProgressState();
  const { isOpen: isKnowledgeModalOpen, onClose: hideKnowledgeModal } =
    useDisclosure({
      defaultIsOpen:
        currentState === StudySessionProgressStates.KNOWLEDGE_REVIEW,
    });

  const onClose = useCallback(() => {
    hideKnowledgeModal();
    nextState();
  }, [hideKnowledgeModal, nextState]);

  switch (currentState) {
    case StudySessionProgressStates.KNOWLEDGE_REVIEW:
      return (
        <KnowledgeModal
          knowledge={knowledge}
          shouldShow={isKnowledgeModalOpen}
          onClose={onClose}
        />
      );
    case StudySessionProgressStates.STUDY_CARDS:
      return (
        <StudyCardStack
          questions={questions}
          onComplete={nextState}
        />
      );
    case StudySessionProgressStates.RESULTS:
      return <StudySessionCompleteModal />;
  }
}
