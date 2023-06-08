/**
 * Page for viewing course content
 */
import type { TCourseData } from "@/lib/db/models/Course.model";
import type { TKnowledgeData } from "@/lib/db/models/Knowledge.model";
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next/types";

import { Text } from "@chakra-ui/react";
import { isFinite, toNumber } from "lodash";
import { useRouter } from "next/router";

import ChakraMarkdown from "@/components/ChakraMarkdown";
import { Hero } from "@/components/Hero";
import Page from "@/components/Page";
import KnowledgeCard from "@/components/feed_cards/KnowledgeCard";
import CourseModel from "@/lib/db/models/Course.model";
import { HTTPBadRequest } from "@/lib/errors/HTTPErrors";
import { useCallback } from "react";

export const getServerSideProps: GetServerSideProps<{
  course: TCourseData;
  knowledge: Array<TKnowledgeData>;
}> = async ({ params }) => {
  const courseIDUntyped = params?.courseID;
  const courseID = toNumber(courseIDUntyped);
  if (!isFinite(courseID)) {
    throw new HTTPBadRequest(`Passed course ID '${courseID}' is invalid`);
  }
  const courseQuery = await CourseModel.queryAll();
  const course = courseQuery.find({ id: toNumber(courseID) }).value();
  const courseModel = new CourseModel(course);
  const knowledge = await courseModel.getKnowledgeData();
  return {
    props: {
      course,
      knowledge,
    },
  };
};

const CoursePage = ({
  course,
  knowledge = [],
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { title, description } = course;

  const router = useRouter();
  const onClickFactory = useCallback(
    (id: number) => () => router.push(`/course/${course.id}/${id}/`),
    [course.id, router],
  );

  return (
    <Page
      header={
        <Hero
          title={title}
          module={<Text color='text'>{description}</Text>}
        />
      }
    >
      {knowledge.map((k, index) => (
        <KnowledgeCard
          key={k.id}
          header={`Unit ${index + 1}`}
          footer={
            <Text color='gray.500'>{`${k.questionIDs.length} questions to study`}</Text>
          }
          onClick={onClickFactory(k.id)}
        >
          <ChakraMarkdown>{k.text}</ChakraMarkdown>
        </KnowledgeCard>
      ))}
    </Page>
  );
};

export default CoursePage;
