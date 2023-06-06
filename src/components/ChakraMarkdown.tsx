import {
  Heading,
  ListItem,
  OrderedList,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import * as React from "react";
import ReactMarkdown from "react-markdown";

type Props = React.ComponentProps<typeof ReactMarkdown>;

const ChakraComponentMapping = {
  h1: ({ node, ...props }: any) => (
    <Heading
      size='lg'
      {...props}
    />
  ),
  h2: ({ node, ...props }: any) => (
    <Heading
      size='md'
      {...props}
    />
  ),
  h3: ({ node, ...props }: any) => (
    <Heading
      size='sm'
      {...props}
    />
  ),
  h4: ({ node, ...props }: any) => (
    <Heading
      size='xs'
      {...props}
    />
  ),
  p: ({ node, ...props }: any) => <Text {...props} />,
  ul: ({ node, ...props }: any) => <UnorderedList {...props} />,
  ol: ({ node, ordered, ...props }: any) => <OrderedList {...props} />,
  li: ({ node, ordered, ...props }: any) => <ListItem {...props} />,
};

/*
 * Description of function
 * @param props
 */
const ChakraMarkdown = ({ children, ...props }: Props) => (
  <ReactMarkdown
    components={ChakraComponentMapping}
    {...props}
  >
    {children}
  </ReactMarkdown>
);

export default ChakraMarkdown;
