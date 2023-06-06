import { ID } from "@/lib/consts/ids";
import { TQuestionData } from "@/lib/db/models/Question.model";
import { TResponseEvaluation } from "@/lib/db/models/responses/Response.model";
import { longFormAnswerValidationFetch } from "@/services/question-answering/question-answering.fetch";
import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  List,
  ListIcon,
  ListItem,
  Spacer,
  Stack,
  StackDivider,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import {
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import ChakraMarkdown from "../ChakraMarkdown";
import BaseFeedCard from "../feed_cards/BaseFeedCard";

export type TResponseFeedback = Omit<TResponseEvaluation, "raw">;

type Props = {
  question: TQuestionData;
  index: number;
  onNext: () => void;
};

/*
 * Card for studying
 */
export default function StudyCard({ index, question, onNext }: Props) {
  const { id: questionID, text: questionText } = question;
  const currentQuestionIndexRef = useRef(index);
  const [response, setResponse] = useState("");
  const [evaluation, setEvaluation] = useState<TResponseFeedback | null>();

  const hasSubmitted = evaluation != null;

  // When we get a new question, reset our current state.
  useEffect(() => {
    if (currentQuestionIndexRef.current !== index) {
      setResponse("");
      setEvaluation(null);
    }
  }, [index]);

  const onChange = useCallback(
    (e: SyntheticEvent<HTMLTextAreaElement>) =>
      setResponse(e.currentTarget.value),
    [],
  );

  const { query } = useRouter();
  const knowledgeConnectionID = ID(query.knowledgeConnectionID);
  const onSubmit = useCallback(
    () =>
      longFormAnswerValidationFetch({
        questionID,
        knowledgeConnectionID,
        // TODO: Replace with client side user data caching.
        studentID: 0,
        answer: response,
      }).then(({ evaluation }) =>
        evaluation == null
          ? null
          : setEvaluation({
              score: evaluation.score,
              feedback: evaluation.feedback,
            }),
      ),
    [knowledgeConnectionID, questionID, response],
  );

  return (
    <>
      <BaseFeedCard
        variant='elevated'
        border='medium'
        borderColor={response.length > 0 ? "green" : "current"}
      >
        <ChakraMarkdown>{questionText}</ChakraMarkdown>
      </BaseFeedCard>
      <BaseFeedCard
        variant='outline'
        colorScheme='whiteAlpha'
      >
        <Stack
          divider={<StackDivider />}
          spacing='4'
        >
          <Box>
            <Heading
              size='xs'
              textTransform='uppercase'
            >
              Response
            </Heading>
            {hasSubmitted ? (
              <Text marginY={4}>{response}</Text>
            ) : (
              <Textarea
                marginY={4}
                placeholder='Write an answer'
                resize='vertical'
                value={response}
                onChange={onChange}
              />
            )}
          </Box>
          {hasSubmitted && (
            <Box>
              <Heading
                size='xs'
                textTransform='uppercase'
              >
                Evaluation
              </Heading>
              <List
                marginY={4}
                spacing={3}
              >
                {evaluation.feedback.correctPoints.map((item, index) => (
                  <ListItem key={index}>
                    <ListIcon
                      as={CheckCircleIcon}
                      color='green.500'
                    />
                    {item}
                  </ListItem>
                ))}
                {evaluation.feedback.missedPoints.map((item, index) => (
                  <ListItem key={index}>
                    <ListIcon
                      as={WarningIcon}
                      color='red.500'
                    />
                    {item}
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
        </Stack>
      </BaseFeedCard>
      <Flex
        minWidth='max-content'
        alignItems='center'
        gap='2'
      >
        <Spacer />
        {hasSubmitted ? (
          <Button
            colorScheme='green'
            onClick={onNext}
          >
            Next
          </Button>
        ) : (
          <Button
            colorScheme='green'
            onClick={onSubmit}
          >
            Submit
          </Button>
        )}
      </Flex>
    </>
  );
}
