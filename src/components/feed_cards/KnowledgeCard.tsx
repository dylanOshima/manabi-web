import type { Props as BaseFeedCardProps } from './BaseFeedCard';
import BaseFeedCard from './BaseFeedCard'

type Props = BaseFeedCardProps;

/**
 * A standard response from the assistant.
 */
export default function KnowledgeCard({ header, footer, children: responseContent }: Props) {
  return <BaseFeedCard header={header} footer={footer}>
    {responseContent}
  </BaseFeedCard>
}