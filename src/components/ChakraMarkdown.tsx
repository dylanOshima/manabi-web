import { Heading, ListItem, OrderedList, Text, UnorderedList } from '@chakra-ui/react';
import * as React from 'react';
import ReactMarkdown from 'react-markdown';

type Props = React.ComponentProps<typeof ReactMarkdown>;

const ChakraComponentMapping = {
  h1: ({ node, ...props }) => <Heading size="lg" {...props} />,
  h2: ({ node, ...props }) => <Heading size="md" {...props} />,
  h3: ({ node, ...props }) => <Heading size="sm" {...props} />,
  h4: ({ node, ...props }) => <Heading size="xs" {...props} />,
  p: ({ node, ...props }) => <Text {...props} />,
  ul: ({ node, ...props }) => <UnorderedList {...props} />,
  ol: ({ node, ...props }) => <OrderedList {...props} />,
  li: ({ node, ...props }) => <ListItem {...props} />,
}

/*
 * Description of function
 * @param props 
 */
const ChakraMarkdown = ({
  children,
  ...props
}: Props) => (
  <ReactMarkdown
    components={ChakraComponentMapping}
    {...props}>
    {children}
  </ReactMarkdown>
);

export default ChakraMarkdown; 