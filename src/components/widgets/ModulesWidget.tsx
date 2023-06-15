import type {
  TStudentCourseDataRequestBody,
  TStudentCourseDataRequestResponse,
} from "@/services/student/student-courses/student-courses.details";
import NextLink from "next/link";

import baseFetch from "@/services/baseFetch";
import { studentModulesURI } from "@/services/student/student-courses/student-courses.details";
import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  LinkBox,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type Props = {};

/**
 * What does this component do?
 */
const CoursesWidget = (_props: Props) => {
  const [courses, setCourses] = useState<TStudentCourseDataRequestResponse>();

  useEffect(() => {
    baseFetch<TStudentCourseDataRequestBody, TStudentCourseDataRequestResponse>(
      studentModulesURI,
      {},
    ).then((courses) => setCourses(courses));
  }, []);

  return (
    <>
      <Heading size='lg'>Courses</Heading>
      <SimpleGrid
        spacing={4}
        templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
        {courses?.map((course) => (
          <CourseCard
            key={course.id}
            {...course}
          />
        ))}
        <FindCoursesCard />
      </SimpleGrid>
    </>
  );
};

const CourseCard = ({
  id,
  title,
  description,
}: TStudentCourseDataRequestResponse[number]) => (
  <Card>
    <CardHeader>
      <Heading size='md'>{title}</Heading>
    </CardHeader>
    <CardBody>
      <Text>{description}</Text>
    </CardBody>
    <CardFooter>
      <NextLink
        href={`/course/${id}/`}
        passHref>
        <Button>View</Button>
      </NextLink>
    </CardFooter>
  </Card>
);

const FindCoursesCard = () => {
  const route = useRouter();
  return (
    <Card align='center'>
      <CardHeader>
        <Heading size='md'>Add Courses</Heading>
      </CardHeader>
      <CardBody>
        <NextLink
          href={`/course`}
          passHref>
          <LinkBox
            border='2px solid green'
            paddingX={6}
            paddingY={5}
            onClick={() => route.push("course")}>
            <AddIcon color='green' />
          </LinkBox>
        </NextLink>
      </CardBody>
    </Card>
  );
};

export default CoursesWidget;
