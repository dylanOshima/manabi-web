import { Text } from '@chakra-ui/react';
import * as React from 'react';
import PromptCard from './feed_cards/PromptCard';
import ResponseCard from './feed_cards/ResponseCard';

type Props = {};

/*
 * Description of function
 * @param props 
 */
export default function Feed(props: Props) {

  return (
    <>
      <PromptCard>
        the concept of market failure as a failure of the market to achieve allocative efficiency, resulting in an overallocation of resources (overprovision of a good) or an under-allocation of resources (under-provision of a good)
      </PromptCard>
      <ResponseCard>
        the concept of market failure as a failure of the market to achieve allocative efficiency, resulting in an overallocation of resources (overprovision of a good) or an under-allocation of resources (under-provision of a good)
      </ResponseCard>
      <PromptCard>
        the concept of market failure as a failure of the market to achieve allocative efficiency, resulting in an overallocation of resources (overprovision of a good) or an under-allocation of resources (under-provision of a good)
      </PromptCard>
      <PromptCard>
        the concept of market failure as a failure of the market to achieve allocative efficiency, resulting in an overallocation of resources (overprovision of a good) or an under-allocation of resources (under-provision of a good)
      </PromptCard>
      <ResponseCard>
        the concept of market failure as a failure of the market to achieve allocative efficiency, resulting in an overallocation of resources (overprovision of a good) or an under-allocation of resources (under-provision of a good)
      </ResponseCard>
      <PromptCard>
        the concept of market failure as a failure of the market to achieve allocative efficiency, resulting in an overallocation of resources (overprovision of a good) or an under-allocation of resources (under-provision of a good)
      </PromptCard>
      <ResponseCard>
        the concept of market failure as a failure of the market to achieve allocative efficiency, resulting in an overallocation of resources (overprovision of a good) or an under-allocation of resources (under-provision of a good)
      </ResponseCard>
      <PromptCard>
        the concept of market failure as a failure of the market to achieve allocative efficiency, resulting in an overallocation of resources (overprovision of a good) or an under-allocation of resources (under-provision of a good)
      </PromptCard>
      <PromptCard>
        the concept of market failure as a failure of the market to achieve allocative efficiency, resulting in an overallocation of resources (overprovision of a good) or an under-allocation of resources (under-provision of a good)
      </PromptCard>
      <ResponseCard>
        the concept of market failure as a failure of the market to achieve allocative efficiency, resulting in an overallocation of resources (overprovision of a good) or an under-allocation of resources (under-provision of a good)
      </ResponseCard>
      <Text color="gray" alignSelf="center">Enter your response!</Text>
    </>
  );
};