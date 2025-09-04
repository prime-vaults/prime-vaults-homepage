import { usePools } from '@beraji/web3-sdk'
import { useSearchParams } from 'react-router-dom'

import { POOL_TABS } from '../Page'
import { SearchQueryKey } from '@/constant/query'
import PoolCard from './PoolCard'

export default function TokenPoolsPage() {
  const [searchParams] = useSearchParams()
  const type = (searchParams.get(SearchQueryKey.Tab) || POOL_TABS[0].key) as
    | 'TOKEN'
    | 'NFT'

  const { data: poolsData, isLoading } = usePools({ type })

  if (isLoading) return <span>loading...</span>
  if (!poolsData || !poolsData.length) return <span>not found</span>

  return (
    <div className="ps-pools">
      {poolsData.map((pool) => (
        <PoolCard poolId={pool.poolId} key={pool.poolId} />
      ))}
    </div>
  )
}
