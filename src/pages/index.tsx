import Page from "@/components/Page";
import ModulesWidget from "@/components/widgets/ModulesWidget";
import { Button } from "@chakra-ui/react";
import NextLink from "next/link";

const Index = () => (
  <Page>
    <NextLink
      href={`/course`}
      passHref>
      <Button aria-label={"Button to view courses"}>Courses Page</Button>
    </NextLink>
    <NextLink
      href={`/study`}
      passHref>
      <Button aria-label={"Button to start a study session"}>Study Page</Button>
    </NextLink>
    <ModulesWidget />
  </Page>
);

export default Index;
