/**
 * Page for viewing course content
 */
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next/types';
import type { TKnowledgeData } from '@/services/models/Knowledge.model';
import type { TCourseData } from '@/services/models/Course.model';

import { Text } from '@chakra-ui/react'
import { useRouter } from 'next/router';
import { isFinite, toNumber } from 'lodash';

import { Container } from '@/components/Container';
import { Hero } from '@/components/Hero';
import { Main } from '@/components/Main';
import { DarkModeSwitch } from '@/components/DarkModeSwitch';
import CourseModel from '@/services/models/Course.model';
import { HTTPBadRequest } from '@/services/errors/HTTPErrors';
import KnowledgeCard from '@/components/feed_cards/KnowledgeCard';
import { useCallback } from 'react';

export const getServerSideProps: GetServerSideProps<{
  course: TCourseData,
  knowledge: Array<TKnowledgeData>
}> = async ({ params }) => {
  const { courseID: courseIDUntyped } = params;
  const courseID = toNumber(courseIDUntyped);
  if (!isFinite(courseID)) {
    throw new HTTPBadRequest({
      debugMessage: `Passed course ID '${courseID}' is invalid`,
    });
  }
  const courseQuery = await CourseModel.queryAll();
  const course = courseQuery.find({ id: toNumber(courseID) }).value();
  const courseModel = new CourseModel(course);
  const knowledge = await courseModel.getKnowledgeData();
  return {
    props: {
      course,
      knowledge,
    }
  };
}

const CoursePage = ({
  course,
  knowledge = []
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { title, description } = course;

  const router = useRouter();
  const onClickFactory = useCallback(
    (id: number) => () => router.push(`/course/${course.id}/${id}/`),
    [course.id, router]
  );

  return (
    <Container height="100vh">
      <Hero
        title={title}
        module={<Text color="text">{description}</Text>}
      />
      <Main>
        {knowledge.map((k, index) => (
          <KnowledgeCard
            key={k.id}
            header={`Unit ${index + 1}`}
            footer={<Text color="gray.500">{`${k.questionIDs.length} questions to study`}</Text>}
            onClick={onClickFactory(k.id)}>
            <Text>{k.text}</Text>
          </KnowledgeCard>
        ))}
      </Main>
      <DarkModeSwitch />
    </Container>
  );
}

export default CoursePage;