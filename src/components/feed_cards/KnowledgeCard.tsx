import type { Props as BaseFeedCardProps } from './BaseFeedCard';
import BaseFeedCard from './BaseFeedCard'

type Props = BaseFeedCardProps;

/**
 * A standard response from the assistant.
 */
export default function KnowledgeCard({
  children: responseContent,
  ...baseCardProps
}: Props) {
  return <BaseFeedCard {...baseCardProps}>
    {responseContent}
  </BaseFeedCard>
}