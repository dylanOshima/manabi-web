import BaseFeedCard from './BaseFeedCard'

type Props = {
  children: React.ReactNode,
}

/**
 * A standard response from the learner
 */
export default function ResponseCard({ children: responseContent }: Props) {
  return <BaseFeedCard header="Shin-Ji Low">
    {responseContent}
  </BaseFeedCard>
}