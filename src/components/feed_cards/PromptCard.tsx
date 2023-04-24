import BaseFeedCard from './BaseFeedCard'

type Props = {
  children: React.ReactNode,
}

/**
 * A standard response from the assistant.
 */
export default function PromptCard({ children: responseContent }: Props) {
  return <BaseFeedCard header="Assistant">
    {responseContent}
  </BaseFeedCard>
}