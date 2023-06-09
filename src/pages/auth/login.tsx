import type { GetServerSideProps } from "next";

import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";

import Page from "@/components/Page";
import { withSessionServerSideRendering } from "@/lib/auth/withSession";
import { loginFetch } from "@/services/auth/login.fetch";

type Props = {};

export const getServerSideProps: GetServerSideProps<Props> =
  withSessionServerSideRendering(async ({ req }) => {
    if (req.session.viewer != null) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
    return {
      props: {},
    };
  });

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [invalidationMessage, setInvalidationMessage] = useState<string | null>(
    null,
  );

  const isInvalid =
    invalidationMessage != null && invalidationMessage.length > 0;

  const router = useRouter();
  const onSubmit = useCallback(() => {
    loginFetch({
      email: email.trim(),
      password: password.trim(),
    })
      .then(() => {
        // We will only reach this point if no issues were thrown
        // hence we redirect
        setInvalidationMessage(null);
        router.push(`/`);
      })
      .catch((error) => setInvalidationMessage(error.message));
  }, [email, password, router]);

  return (
    <Page>
      <Box
        width='lg'
        borderWidth='1px'
        borderRadius='lg'
        p={8}
        boxShadow='lg'
        m='auto'
        mt={20}>
        <Stack spacing={4}>
          <FormControl isInvalid={isInvalid}>
            <FormErrorMessage>{invalidationMessage}</FormErrorMessage>
            <FormLabel>Email</FormLabel>
            <Input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              placeholder='Enter your email'
            />
            <br />
            <FormLabel>Password</FormLabel>
            <Input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              placeholder='Enter your password'
            />
          </FormControl>
          <Button
            colorScheme='green'
            size='lg'
            width='full'
            onClick={onSubmit}>
            Sign In
          </Button>
        </Stack>
      </Box>
    </Page>
  );
}
