import { Flex, Heading, Text, Stack } from '@chakra-ui/react'

type Props = {
  module: React.ReactNode,
  title: string
}

export const Hero = ({ title, module }: Props) => (
  <Flex
    justifyContent="center"
    alignItems="start"
    bgGradient="linear(to-l, heroGradientStart, heroGradientEnd)"
    bgClip="text"
  >
    <Stack textAlign="center" paddingBlockStart="1vh">
      <Heading fontSize="1vw">{module}</Heading>
      <Heading fontSize="6vw">{title}</Heading>
    </Stack>
  </Flex>
)

Hero.defaultProps = {
  title: "Economics",
}
