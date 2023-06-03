/**
 * Holds the current state of the student's study session.
 */

import { useCallback, useState } from "react";

export enum StudySessionProgressStates {
  KNOWLEDGE_REVIEW = "KNOWLEDGE_REVIEW",
  STUDY_CARDS = "STUDY_CARDS",
  RESULTS = "RESULTS",
}

export function useStudySessionProgressState(
  initialState: StudySessionProgressStates = StudySessionProgressStates.KNOWLEDGE_REVIEW,
) {
  const [currentState, setCurrentState] = useState(initialState);

  const nextState = useCallback(() =>
    setCurrentState(getNextState(currentState))
    , [currentState]);

  return {
    nextState,
    currentState,
  }
}

function getNextState(currentState: StudySessionProgressStates): StudySessionProgressStates {
  switch (currentState) {
    case StudySessionProgressStates.KNOWLEDGE_REVIEW:
      return StudySessionProgressStates.STUDY_CARDS;
    case StudySessionProgressStates.STUDY_CARDS:
      return StudySessionProgressStates.RESULTS;
    case StudySessionProgressStates.RESULTS:
      return StudySessionProgressStates.RESULTS;
  }
}