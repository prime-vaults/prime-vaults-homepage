import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'

import Container from '@/components/UI/Container'
import Tab, { TabItem } from '@/components/UI/Tab'
import TokenPoolsPage from './listPools/Page'

import { SearchQueryKey } from '@/constant/query'
import { useUpdateSearchParams } from '@/hooks/updateSearchParams'

export const POOL_TABS: TabItem[] = [
  { key: 'TOKEN', label: 'Tokens' },
  { key: 'NFT', label: 'NFTs' },
]

export default function StakingPage() {
  const { update } = useUpdateSearchParams()
  const [searchParams] = useSearchParams()
  const tab = searchParams.get(SearchQueryKey.Tab) || POOL_TABS[0].key

  const onUpdateParams = useCallback(
    (value: string) => {
      update(SearchQueryKey.Tab, value)
    },
    [update],
  )

  return (
    <Container>
      <div className="page-staking">
        <Tab items={POOL_TABS} activeKey={tab} onClick={onUpdateParams} />
        <TokenPoolsPage />
      </div>
    </Container>
  )
}
