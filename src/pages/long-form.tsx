import { Container } from "../components/Container";
import React, { useState } from "react";
import {
  Heading,
  Textarea,
  Button,
  Text,
  Card,
  CardHeader,
  CardBody,
} from "@chakra-ui/react";
import { longFormAnswerValidationFetch } from "@/services/long-form-answer-validation/long-form-answer-validation.fetch";

const QUESTIONS_AND_REFERENCE = [
  {
    question:
      "What are all the differences between perfect competition and monopolistic competition?",
    reference:
      "A monopolistic market and a perfectly competitive market are two market structures that have several key distinctions in terms of market share, price control, and barriers to entry. In a monopolistic market, there is only one firm that dictates the price and supply levels of goods and services, and that firm has total market control. In contrast to a monopolistic market, a perfectly competitive market is composed of many firms, where no one firm has market control.",
  },
];

const LongFormPage = () => {
  const [studentAnswerInput, setStudentAnswerInput] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  async function onSubmit(
    event: React.MouseEvent<HTMLButtonElement>,
    question: string,
    reference: string
  ) {
    setLoading(true);
    event.preventDefault();
    try {
      const validationResult = await longFormAnswerValidationFetch({
        answer: studentAnswerInput,
        question,
        reference,
      });
      setResult(validationResult);
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container height="100vh">
      <Heading margin="10">Answer Prompts</Heading>
      {QUESTIONS_AND_REFERENCE.map(({ question, reference }) => (
        <div key={question}>
          <Text as="b" display="block" fontSize="md" marginBottom="20px">
            {question}
          </Text>
          <Textarea
            display="block"
            maxWidth="750px"
            marginBottom="20px"
            placeholder="Write an answer"
            resize="vertical"
            value={studentAnswerInput}
            onChange={(e) => setStudentAnswerInput(e.target.value)}
          />
          <Button
            isLoading={loading}
            colorScheme="teal"
            variant="solid"
            onClick={(e) => onSubmit(e, question, reference)}
          >
            Submit Answer
          </Button>
          {!!result && (
            <Card maxWidth="750px" marginTop="20px">
              <CardHeader>
                <Heading size="md">Results</Heading>
              </CardHeader>
              <CardBody>
                <Text>{result.trim()}</Text>
              </CardBody>
            </Card>
          )}
        </div>
      ))}
    </Container>
  );
};

export default LongFormPage;
