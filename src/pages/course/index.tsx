/**
 * Page for viewing the courses available
 */
import type { GetServerSideProps } from 'next';

import NextLink from 'next/link'
import { Text, Button, ButtonGroup } from '@chakra-ui/react'
import { ArrowRightIcon, AtSignIcon } from '@chakra-ui/icons';

import { Container } from '@/components/Container';
import { Main } from '@/components/Main';
import { DarkModeSwitch } from '@/components/DarkModeSwitch';
import CourseModel, { TCourseData } from '@/services/models/Course.model';
import BaseFeedCard from '@/components/feed_cards/BaseFeedCard';

type Props = {
  courses: Array<TCourseData>,
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const courseQuery = await CourseModel.queryAll();
  const courses = await courseQuery.value();
  return {
    props: { courses }
  };
}

const CoursePage = ({ courses }: Props) => (
  <Container height="100vh">
    <Main>
      {courses.map(course => {
        const numStudents = course.studentIDs.length;
        return (
          <BaseFeedCard
            size="lg"
            key={course.id}
            header={course.title}
            footer={
              <ButtonGroup spacing='2'>
                <NextLink href={`/users/`} passHref>
                  <Button aria-label={'Button to view users'} leftIcon={<AtSignIcon />} disabled>
                    {numStudents} student{numStudents > 1 ? "s" : ""}
                  </Button>
                </NextLink>
                <NextLink href={`/course/${course.id}`} passHref>
                  <Button leftIcon={<ArrowRightIcon />}>View Course</Button>
                </NextLink>
              </ButtonGroup>
            }>
            <Text>{course.description}</Text>
          </BaseFeedCard>
        )
      })}
    </Main>
    <DarkModeSwitch />
  </Container>
);

export default CoursePage;