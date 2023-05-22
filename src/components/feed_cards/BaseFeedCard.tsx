import { Card, CardBody, CardFooter, Heading, Text } from '@chakra-ui/react'
import * as React from 'react';

export type Props = {
  header?: string,
  footer?: React.ReactNode,
  children: React.ReactNode,
}

/**
 * A standard card in the main feed. This is the base card that other cards build on top of.
 */
export default function BaseFeedCard({
  header,
  footer,
  children: body
}: Props) {

  return (
    <Card variant="outline">
      <CardBody>
        {header && (
          <Heading size='md'>
            <Text color="gray">
              <b>{header}</b>
            </Text>
          </Heading>
        )}
        {body}
      </CardBody>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  )
}