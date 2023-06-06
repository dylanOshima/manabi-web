import {
  Box,
  Button,
  ChakraProvider,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";

export default function LoginPage() {
  return (
    <ChakraProvider>
      <Box
        maxW='md'
        borderWidth='1px'
        borderRadius='lg'
        p={8}
        boxShadow='lg'
        m='auto'
        mt={20}
      >
        <Stack spacing={4}>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              type='email'
              placeholder='Enter your email'
            />
          </FormControl>

          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              type='password'
              placeholder='Enter your password'
            />
          </FormControl>

          <Button
            colorScheme='green'
            size='lg'
            width='full'
          >
            Sign In
          </Button>
        </Stack>
      </Box>
    </ChakraProvider>
  );
}
